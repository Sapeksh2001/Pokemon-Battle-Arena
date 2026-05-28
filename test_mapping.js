const PokemonAbilitiesMap = {
  "Zapdos": [{name:"Pressure",hidden:false},{name:"Static",hidden:true}],
  "Zapdos Galar": [{name:"Defiant",hidden:false}]
};

function getAbilities(fullName, baseName) {
  const normalize = (n) => n ? n.replace(/-/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const normFull = normalize(fullName);
  const normBase = normalize(baseName);
  return PokemonAbilitiesMap[normFull] || PokemonAbilitiesMap[fullName] || PokemonAbilitiesMap[normBase] || PokemonAbilitiesMap[baseName] || [];
}
console.log(getAbilities("Zapdos-Galar", "Zapdos"));
