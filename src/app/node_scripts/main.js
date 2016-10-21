var scraper = require("./scraper.js");


//scraper.items_to_json("https://www.dandwiki.com/wiki/5e_SRD:Weapons", ['name', 'cost', 'damage', 'weight', 'props'], "test.json");
//scraper.items_to_json("https://www.dandwiki.com/wiki/5e_SRD:Armor", ['name', 'cost', 'ac', 'strength', 'stealth', 'weight'], "test.json");
//scraper.items_to_json("https://www.dandwiki.com/wiki/5e_SRD:Adventuring_Gear", ['name', 'cost', 'weight'], "test.json");
//scraper.items_to_json("https://www.dandwiki.com/wiki/5e_SRD:Tools", ['name', 'cost', 'weight'], "test.json");
//scraper.items_to_json("https://www.dandwiki.com/wiki/5e_SRD:Trade_Goods", ['name','cost'], "test.json");
scraper.items_to_json("https://www.dnd-spells.com/spells", ['name', 'source'], "test.json");
