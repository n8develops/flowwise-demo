import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { public_token } = await req.json();

    if (!public_token) {
      throw new Error('Missing public_token');
    }

    const PLAID_CLIENT_ID = Deno.env.get('PLAID_CLIENT_ID');
    const PLAID_SECRET = Deno.env.get('PLAID_SECRET');

    if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
      throw new Error('Plaid credentials not configured');
    }

    console.log('Exchanging public token...');

    // Exchange public token for access token
    const response = await fetch('https://sandbox.plaid.com/item/public_token/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        public_token: public_token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Plaid exchange error:', data);
      throw new Error(data.error_message || 'Failed to exchange token');
    }

    const { access_token, item_id } = data;

    console.log('Token exchanged successfully, fetching transactions...');

    // Fetch transactions using the access token
    const transactionsResponse = await fetch('https://sandbox.plaid.com/transactions/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        access_token: access_token,
        start_date: '2025-10-01',
        end_date: '2025-10-25',
      }),
    });

    const transactionsData = await transactionsResponse.json();

    if (!transactionsResponse.ok) {
      console.error('Plaid transactions error:', transactionsData);
      // Don't fail if we can't get transactions, just return the access token
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store the access token and basic financial summary
    const { error: dbError } = await supabaseClient
      .from('user_financial_data')
      .upsert({
        user_id: 'demo-user', // In production, use authenticated user ID
        access_token: access_token,
        item_id: item_id,
        income: 1140,
        spending: 960,
        updated_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Don't fail if database insert fails
    }

    console.log('Exchange completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        access_token: access_token,
        item_id: item_id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in exchange-public-token:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to exchange public token'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
