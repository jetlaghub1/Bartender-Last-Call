(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.BLC_STORAGE=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function create({storage=null,key='blc.deck',validate,fallback}){
    if(typeof validate!=='function')throw new Error('Deck storage requires a validator.');
    if(typeof fallback!=='function')throw new Error('Deck storage requires a fallback deck factory.');
    let sessionDeck=null;
    const copy=ids=>Array.isArray(ids)?[...ids]:ids;
    const valid=ids=>Array.isArray(ids)&&validate(ids);
    function load(){
      try{
        const raw=storage&&storage.getItem(key);
        const saved=raw?JSON.parse(raw):null;
        if(valid(saved)){sessionDeck=copy(saved);return{ids:copy(saved),source:'persistent'}}
      }catch(error){}
      if(valid(sessionDeck))return{ids:copy(sessionDeck),source:'session'};
      const starter=copy(fallback());
      sessionDeck=copy(starter);
      return{ids:starter,source:'starter'};
    }
    function save(ids){
      if(!valid(ids))return{ok:false,persistent:false,message:'Deck was not saved. It must contain exactly 30 cards with no more than 3 copies of each drink.'};
      const next=copy(ids);
      sessionDeck=copy(next);
      try{
        if(!storage)throw new Error('Persistent storage unavailable.');
        storage.setItem(key,JSON.stringify(next));
        const verified=JSON.parse(storage.getItem(key));
        if(!valid(verified)||JSON.stringify(verified)!==JSON.stringify(next))throw new Error('Saved deck could not be verified.');
        return{ok:true,persistent:true,message:'Deck saved — 30 cards ready for your next match.'};
      }catch(error){
        return{ok:true,persistent:false,message:'Deck is ready for this session, but this browser blocked permanent saving.'};
      }
    }
    return{load,save};
  }
  return{create};
});

