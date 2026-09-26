(() => {
  const cfg = window.SECURITY_STORE_CONFIG || {};
  let client = null;
  function configured(){ return cfg.supabaseUrl && cfg.supabaseAnonKey && !cfg.supabaseUrl.includes("SEU-PROJETO") && !cfg.supabaseAnonKey.includes("SUA_ANON_KEY"); }
  function getClient(){
    if(!configured()) return null;
    if(client) return client;
    if(!window.supabase) throw new Error("Supabase JS não carregado.");
    client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    return client;
  }
  window.StoreDB={configured,getClient};
})();