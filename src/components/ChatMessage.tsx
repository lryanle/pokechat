// Code adapted from Waseem Polus (github/waseem-polus)

import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Tooltip from "@/components/Tooltip";
import { SmallPokemonCard } from "./SmallPokemonCard";

type userMessageT = {
	role: "user";
	content: string;
};

type assistantMessageT = {
	role: "assistant";
	content: string;
	type: "command" | "answer";
	tooltips: { [key: string]: any };
};

export type Msg = userMessageT | assistantMessageT;

const pokemonList = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew","chikorita","bayleef","meganium","cyndaquil","quilava","typhlosion","totodile","croconaw","feraligatr","sentret","furret","hoothoot","noctowl","ledyba","ledian","spinarak","ariados","crobat","chinchou","lanturn","pichu","cleffa","igglybuff","togepi","togetic","natu","xatu","mareep","flaaffy","ampharos","bellossom","marill","azumarill","sudowoodo","politoed","hoppip","skiploom","jumpluff","aipom","sunkern","sunflora","yanma","wooper","quagsire","espeon","umbreon","murkrow","slowking","misdreavus","unown","wobbuffet","girafarig","pineco","forretress","dunsparce","gligar","steelix","snubbull","granbull","qwilfish","scizor","shuckle","heracross","sneasel","teddiursa","ursaring","slugma","magcargo","swinub","piloswine","corsola","remoraid","octillery","delibird","mantine","skarmory","houndour","houndoom","kingdra","phanpy","donphan","porygon2","stantler","smeargle","tyrogue","hitmontop","smoochum","elekid","magby","miltank","blissey","raikou","entei","suicune","larvitar","pupitar","tyranitar","lugia","ho-oh","celebi","treecko","grovyle","sceptile","torchic","combusken","blaziken","mudkip","marshtomp","swampert","poochyena","mightyena","zigzagoon","linoone","wurmple","silcoon","beautifly","cascoon","dustox","lotad","lombre","ludicolo","seedot","nuzleaf","shiftry","taillow","swellow","wingull","pelipper","ralts","kirlia","gardevoir","surskit","masquerain","shroomish","breloom","slakoth","vigoroth","slaking","nincada","ninjask","shedinja","whismur","loudred","exploud","makuhita","hariyama","azurill","nosepass","skitty","delcatty","sableye","mawile","aron","lairon","aggron","meditite","medicham","electrike","manectric","plusle","minun","volbeat","illumise","roselia","gulpin","swalot","carvanha","sharpedo","wailmer","wailord","numel","camerupt","torkoal","spoink","grumpig","spinda","trapinch","vibrava","flygon","cacnea","cacturne","swablu","altaria","zangoose","seviper","lunatone","solrock","barboach","whiscash","corphish","crawdaunt","baltoy","claydol","lileep","cradily","anorith","armaldo","feebas","milotic","castform","kecleon","shuppet","banette","duskull","dusclops","tropius","chimecho","absol","wynaut","snorunt","glalie","spheal","sealeo","walrein","clamperl","huntail","gorebyss","relicanth","luvdisc","bagon","shelgon","salamence","beldum","metang","metagross","regirock","regice","registeel","latias","latios","kyogre","groudon","rayquaza","jirachi","deoxys-normal","turtwig","grotle","torterra","chimchar","monferno","infernape","piplup","prinplup","empoleon","starly","staravia","staraptor","bidoof","bibarel","kricketot","kricketune","shinx","luxio","luxray","budew","roserade","cranidos","rampardos","shieldon","bastiodon","burmy","wormadam-plant","mothim","combee","vespiquen","pachirisu","buizel","floatzel","cherubi","cherrim","shellos","gastrodon","ambipom","drifloon","drifblim","buneary","lopunny","mismagius","honchkrow","glameow","purugly","chingling","stunky","skuntank","bronzor","bronzong","bonsly","mime-jr","happiny","chatot","spiritomb","gible","gabite","garchomp","munchlax","riolu","lucario","hippopotas","hippowdon","skorupi","drapion","croagunk","toxicroak","carnivine","finneon","lumineon","mantyke","snover","abomasnow","weavile","magnezone","lickilicky","rhyperior","tangrowth","electivire","magmortar","togekiss","yanmega","leafeon","glaceon","gliscor","mamoswine","porygon-z","gallade","probopass","dusknoir","froslass","rotom","uxie","mesprit","azelf","dialga","palkia","heatran","regigigas","giratina-altered","cresselia","phione","manaphy","darkrai","shaymin-land","arceus","victini","snivy","servine","serperior","tepig","pignite","emboar","oshawott","dewott","samurott","patrat","watchog","lillipup","herdier","stoutland","purrloin","liepard","pansage","simisage","pansear","simisear","panpour","simipour","munna","musharna","pidove","tranquill","unfezant","blitzle","zebstrika","roggenrola","boldore","gigalith","woobat","swoobat","drilbur","excadrill","audino","timburr","gurdurr","conkeldurr","tympole","palpitoad","seismitoad","throh","sawk","sewaddle","swadloon","leavanny","venipede","whirlipede","scolipede","cottonee","whimsicott","petilil","lilligant","basculin-red-striped","sandile","krokorok","krookodile","darumaka","darmanitan-standard","maractus","dwebble","crustle","scraggy","scrafty","sigilyph","yamask","cofagrigus","tirtouga","carracosta","archen","archeops","trubbish","garbodor","zorua","zoroark","minccino","cinccino","gothita","gothorita","gothitelle","solosis","duosion","reuniclus","ducklett","swanna","vanillite","vanillish","vanilluxe","deerling","sawsbuck","emolga","karrablast","escavalier","foongus","amoonguss","frillish","jellicent","alomomola","joltik","galvantula","ferroseed","ferrothorn","klink","klang","klinklang","tynamo","eelektrik","eelektross","elgyem","beheeyem","litwick","lampent","chandelure","axew","fraxure","haxorus","cubchoo","beartic","cryogonal","shelmet","accelgor","stunfisk","mienfoo","mienshao","druddigon","golett","golurk","pawniard","bisharp","bouffalant","rufflet","braviary","vullaby","mandibuzz","heatmor","durant","deino","zweilous","hydreigon","larvesta","volcarona","cobalion","terrakion","virizion","tornadus-incarnate","thundurus-incarnate","reshiram","zekrom","landorus-incarnate","kyurem","keldeo-ordinary","meloetta-aria","genesect","chespin","quilladin","chesnaught","fennekin","braixen","delphox","froakie","frogadier","greninja","bunnelby","diggersby","fletchling","fletchinder","talonflame","scatterbug","spewpa","vivillon","litleo","pyroar","flabebe","floette","florges","skiddo","gogoat","pancham","pangoro","furfrou","espurr","meowstic-male","honedge","doublade","aegislash-shield","spritzee","aromatisse","swirlix","slurpuff","inkay","malamar","binacle","barbaracle","skrelp","dragalge","clauncher","clawitzer","helioptile","heliolisk","tyrunt","tyrantrum","amaura","aurorus","sylveon","hawlucha","dedenne","carbink","goomy","sliggoo","goodra","klefki","phantump","trevenant","pumpkaboo-average","gourgeist-average","bergmite","avalugg","noibat","noivern","xerneas","yveltal","zygarde-50","diancie","hoopa","volcanion","rowlet","dartrix","decidueye","litten","torracat","incineroar","popplio","brionne","primarina","pikipek","trumbeak","toucannon","yungoos","gumshoos","grubbin","charjabug","vikavolt","crabrawler","crabominable","oricorio-baile","cutiefly","ribombee","rockruff","lycanroc-midday","wishiwashi-solo","mareanie","toxapex","mudbray","mudsdale","dewpider","araquanid","fomantis","lurantis","morelull","shiinotic","salandit","salazzle","stufful","bewear","bounsweet","steenee","tsareena","comfey","oranguru","passimian","wimpod","golisopod","sandygast","palossand","pyukumuku","type-null","silvally","minior-red-meteor","komala","turtonator","togedemaru","mimikyu-disguised","bruxish","drampa","dhelmise","jangmo-o","hakamo-o","kommo-o","tapu-koko","tapu-lele","tapu-bulu","tapu-fini","cosmog","cosmoem","solgaleo","lunala","nihilego","buzzwole","pheromosa","xurkitree","celesteela","kartana","guzzlord","necrozma","magearna","marshadow","poipole","naganadel","stakataka","blacephalon","zeraora","meltan","melmetal","grookey","thwackey","rillaboom","scorbunny","raboot","cinderace","sobble","drizzile","inteleon","skwovet","greedent","rookidee","corvisquire","corviknight","blipbug","dottler","orbeetle","nickit","thievul","gossifleur","eldegoss","wooloo","dubwool","chewtle","drednaw","yamper","boltund","rolycoly","carkol","coalossal","applin","flapple","appletun","silicobra","sandaconda","cramorant","arrokuda","barraskewda","toxel","toxtricity-amped","sizzlipede","centiskorch","clobbopus","grapploct","sinistea","polteageist","hatenna","hattrem","hatterene","impidimp","morgrem","grimmsnarl","obstagoon","perrserker","cursola","sirfetchd","mr-rime","runerigus","milcery","alcremie","falinks","pincurchin","snom","frosmoth","stonjourner","eiscue-ice","indeedee-male","morpeko-full-belly","cufant","copperajah","dracozolt","arctozolt","dracovish","arctovish","duraludon","dreepy","drakloak","dragapult","zacian","zamazenta","eternatus","kubfu","urshifu-single-strike","zarude","regieleki","regidrago","glastrier","spectrier","calyrex","wyrdeer","kleavor","ursaluna","basculegion-male","sneasler","overqwil","enamorus-incarnate","sprigatito","floragato","meowscarada","fuecoco","crocalor","skeledirge","quaxly","quaxwell","quaquaval","lechonk","oinkologne","tarountula","spidops","nymble","lokix","pawmi","pawmo","pawmot","tandemaus","maushold","fidough","dachsbun","smoliv","dolliv","arboliva","squawkabilly","nacli","naclstack","garganacl","charcadet","armarouge","ceruledge","tadbulb","bellibolt","wattrel","kilowattrel","maschiff","mabosstiff","shroodle","grafaiai","bramblin","brambleghast","toedscool","toedscruel","klawf","capsakid","scovillain","rellor","rabsca","flittle","espathra","tinkatink","tinkatuff","tinkaton","wiglett","wugtrio","bombirdier","finizen","palafin","varoom","revavroom","cyclizar","orthworm","glimmet","glimmora","greavard","houndstone","flamigo","cetoddle","cetitan","veluza","dondozo","tatsugiri","annihilape","clodsire","farigiraf","dudunsparce","kingambit","great-tusk","scream-tail","brute-bonnet","flutter-mane","slither-wing","sandy-shocks","iron-treads","iron-bundle","iron-hands","iron-jugulis","iron-moth","iron-thorns","frigibax","arctibax","baxcalibur","gimmighoul","gholdengo","wo-chien","chien-pao","ting-lu","chi-yu","roaring-moon","iron-valiant","koraidon","miraidon","walking-wake","iron-leaves","dipplin","poltchageist","sinistcha","okidogi","munkidori","fezandipiti","ogerpon","archaludon","hydrapple","gouging-fire","raging-bolt","iron-boulder","iron-crown","terapagos","pecharunt"]


type props = {
	message: Msg;
	loading?: boolean;
};

type userMessageProps = {
	message: Msg;
};

export const Message = ({ message, loading = false }: props) => {
	return message.role == "user" ? (
		<UsrMsg message={message} />
	) : (
		<AssistantMsg message={message} loading={loading} />
	);
};

const UsrMsg = ({ message }: userMessageProps) => {
	return (
		<div className="flex flex-row-reverse gap-2">
			<Avatar>
				<AvatarImage
					className="scale-x-[-1] rounded-full"
					src="./userpfp.png"
				></AvatarImage>
			</Avatar>

			<div className="bg-red-200 text-left px-5 py-2 rounded-2xl rounded-tr-none max-w-screen-md">
				{message.content}
			</div>
		</div>
	);
};

const AssistantMsg = ({ message, loading = false }: props) => {
	const [content, setContent] = useState<(string | JSX.Element)[]>([]);

	useEffect(() => {
		if (message.role === "assistant") {
			const pokemonRegex = new RegExp(`<<([^>>]*)>>|\\b(${pokemonList.join("|")})\\b`, "gi");
			let lastIndex = 0;
			const newContent = [];

			while (true) {
				const match = pokemonRegex.exec(message.content);
				if (!match) break;

				if (lastIndex !== match.index) {
					newContent.push(
						...message.content
							.slice(lastIndex, match.index)
							.split(" ")
							.map((word, i) =>
								word ? <span key={`${word}${i}/${match.index-lastIndex}`}>{word} </span> : null
							)
							.filter((element) => element !== null)
					);
				}

				if (match[1]) {
					newContent.push(
						<HoverCard key={newContent.length+match.index}>
							<HoverCardTrigger className="inline">
								<Text tooltip>{match[1]}</Text>
							</HoverCardTrigger>
							<HoverCardContent className="w-fit min-w-96 max-w-prose">
								<Tooltip word={match[1]} definition={message.tooltips[match[1]]} />
							</HoverCardContent>
						</HoverCard>
					);
				} else if (match[2]) {
					const pokemonName = match[2].toLowerCase();
					newContent.push(
						<HoverCard key={newContent.length}>
							<HoverCardTrigger className="inline">
								<Text tooltip>{match[2]}</Text>
							</HoverCardTrigger>
							<HoverCardContent className="min-w-40 w-40 max-w-40">
								<SmallPokemonCard
									pokemon={pokemonList.indexOf(pokemonName)}
									index={0}
								/>
							</HoverCardContent>
						</HoverCard>
					);
				}

				lastIndex = match.index + match[0].length;
			}

			if (lastIndex < message.content.length) {
				newContent.push(
					...message.content
						.slice(lastIndex)
						.split(" ")
						.map((word, index) =>
							word ? <span key={`${word}-${index}-${lastIndex}`}>{word} </span> : null
						)
						.filter((element) => element !== null)
				);
			}

			setContent(newContent as any);
		}
	}, [message]);

	return (
		<div className="flex flex-row gap-2">
			<Avatar>
				<AvatarImage
					className="scale-x-[-1] rounded-full"
					src="./trainerpfp.png"
				></AvatarImage>
			</Avatar>
			<div className="bg-gray-200 flex text-wrap flex-wrap px-5 gap-1 py-2 rounded-2xl rounded-tl-none max-w-screen-md text-left">
				{loading ? <Loader2 className="animate-spin" /> : content}
			</div>
		</div>
	);
};

const Text = ({ children, tooltip = false }: { children: string; tooltip?: boolean }) => {
	return (
		<span
			className={
				tooltip
					? "inline-flex text-left rounded-sm font-semibold underline cursor-pointer"
					: "inline-flex text-left break-words"
			}
		>
			{children}
		</span>
	);
};
