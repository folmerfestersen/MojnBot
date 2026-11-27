/* MojnBot – vidensbase om Sønderjylland.
   steder: byer og egne (nøgleord -> svar). emner: kultur, mad, folk, firmaer. sladder: eskalerende historier.
   Alt er skrevet på sønderjysk (østsønderjysk / Affenraa-stavning). Ret og tilføj frit. */

window.VIDEN = {

  steder: [
    /* ---------- Aabenraa Kommune ---------- */
    { navne: ["aabenraa", "åbenrå", "Affenraa", "affenraa", "apenrade"], svar: [
      "Affenraa! Min by. Æ fjoe, Folkehjem, Brundlund Slot å æ bæest kaffeboe. Å så saje vi æ, it a.",
      "Affenraa hæ Danmarks dybest havn, Danmarks stoest ringrien i juli, å Folkehjem, wo H.P. Hanssen i novembe 1918 soj, at nå sku vi jem tæ Danmark. Det blew vi så i 1920.",
      "I Affenraa hæ vi Sønderjyllandshallen, Sydbank, Abena å Jacob Michelsens Gåe. Å Hjelm Skov tæ å gå en tur i, wenn æ kach ska nee.",
      "Affenraa ligge nee i æ bund a æ fjoe, å folk fra Løjt kigge nee å wos fra æ bakker. Men vi hæ æ gågade, så vi æ ligeglaj."
    ] },
    { navne: ["rødekro", "røekro", "roedekro"], svar: [
      "Røekro! Det æ wo æ toch stoppe, wenn man ska tæ Affenraa, for Affenraa hæ ingen station. Så Røekro æ Affenrås forstue, ka man saj.",
      "Røekro hæ Fladhøj, Rise Kirk, en motorvejsafkøesel å en kro, æ by æ opkaldt ætte. Å så ligge Hærvejen lich ve siden a. Folk fra Røekro æ sinne folk.",
      "Røekro ringrien æ it så stoe som Affenrås, men æ øl æ det samme. Å så hæ de Rødekro Skole å en hel masse parcelhuus mæ kritbar i æ haw."
    ] },
    { navne: ["løjt", "løjt kirkeby", "løjt land", "barsø", "loddenhøj", "sandskær"], svar: [
      "Løjt Land! Dæ boej æ gammel kaptajner i stoe gåe, for Løjt-folk sejlet øwer heel æ væeden i 1700-tallet. Nå sejle de mest tæ Barsø mæ æ færge fra Barsø Landing.",
      "Løjt Kirkeby ligge oppe å æ bakke å kigge nee å Affenraa. Loddenhøj å Sandskær æ strande, å Løjt-æ kaptajner hæ efterlat sæ noen a æ flottest huus i Synnejylland."
    ] },
    { navne: ["genner", "genner bugt", "genner strand", "kalvø"], svar: [
      "Genner! Dæ ligge Genner Bugt å Kalvø, å det æ lich omkring Genner, at 'æ' blyve tæ 'a'. Syd for saje vi æ, nord for saje de a. Genner æ æ sprochgræns.",
      "Kalvø ve Genner æ en lille ø mæ en dæmning å en gammel skibsværft. Goj tæ en synda-tur mæ kaffe i æ taask."
    ] },
    { navne: ["hovslund", "hovslund stationsby", "immervad", "øster løgum", "hellevad", "bedsted"], svar: [
      "Hovslund Stationsby! Hærvejen gæ lich forbi, å Immervad Bro æ en a de ældst stenbroe i Danmark. Å så æ der en station, som navnet saje.",
      "Hellevad, Øster Løgum å Bedsted, det æ æ landsbyer mel Røekro å Tynne. Dæ æ kirk, forsamlingshus å en masse køe. Å ålle kinne ålle."
    ] },
    { navne: ["hjordkær", "bolderslev", "bjolderup", "ravsted", "bylderup", "bylderup-bov", "uge", "egvad"], svar: [
      "Hjordkær, Bolderslev, Ravsted å Bylderup-Bov, det æ æ hjært a Affenraa Kommune, wo æ land æ fladt å æ folk æ goi. Ravsted hæ en richte goj ringrien ås.",
      "Bolderslev ligge ve æ jernban mel Røekro å Tinglev. Dæ saje de æ, å de saje det mæ eftertryk."
    ] },
    { navne: ["tinglev", "tinglev mose", "tinglef"], svar: [
      "Tinglev! Jernbanknudepunkt, Tinglev Mose å en stoe tysk skole. Hee æ æ mindretal tæt å, å folk skifte mel synnejysk, tysk å plattysk uen å blink.",
      "Vest for Tinglev begynne de å saj 'si'e' i staj for 'saje'. Så Tinglev æ ås en sprochgræns, lich som Genner. Vi hæ manne grænser hee."
    ] },
    { navne: ["kliplev", "kliplev marked", "søgård", "søgaard"], svar: [
      "Kliplev! Kliplev Marked i juni æ et a de ældst markeder i Danmark, mæ heste, kræmmere å øl. Å så ligge Søgård Kaserne lich ve siden a.",
      "Kliplev hæ en flot kirk mæ et fritståend klokketårn. Å æ motorvej tæ Synneborre starte dæ."
    ] },
    { navne: ["felsted", "varnæs", "bovrup", "holbøl", "kværs", "tråsbøl", "traasbøl"], svar: [
      "Felsted, Varnæs å Bovrup, det æ Sundeved-siden. Dæ begynne de så småt å saj 'e' i staj for 'æ', for Als æ it langt væk. Men de æ goi folk mæ goi kaffeboe.",
      "Holbøl å Kværs ligge nee mod æ græns. Dæ æ skov, tysk skole å dansk skole ve siden a æ nan, å ålle snakke mæ ålle."
    ] },
    { navne: ["kollund", "kollund skov", "fjordvejen", "sønderhav", "rønshoved"], svar: [
      "Kollund! Skov, Flensborg Fjord å Fjordvejen, den smukkest vej i Synnejylland. Fra Kollund ka do se øwer tæ Tyskland, å det æ ålt sammen Okseøerne imel.",
      "Kollund Skov æ wo folk fra Affenraa køe hen om synda for å gå en tur å så spise is i Sønderhav. Rønshoved Højskole ligge dæ ås."
    ] },
    { navne: ["kruså", "krusaa", "kruså tunneldal", "grænseovergang"], svar: [
      "Kruså! Æ grænsovergang. Dæ køe ålle igennem, wenn de ska tæ Flensborre ætte øl, slik å sprit. Kruså Tunneldal æ smuk, men det æ dæ ingen dæ lægge mærk tæ, de ska ba' øwer.",
      "Kruså hæ et grænsemuseum, en masse valutavekslere å folk dæ saje mojn å begge sie a æ græns."
    ] },
    { navne: ["padborg", "pattburg", "padborg transportcenter", "lastbil", "lastbiler"], svar: [
      "Padborg! Lastbiler, lastbiler å lastbiler. Padborg Transportcenter æ et a de stoest i Nordeuropa, å ålle de svensk å norsk lastbiler holl dæ å sawe.",
      "Padborg ligge lich ve æ græns, å Frøslevlejren ligge lich ve siden a. Så dæ æ båe historie å dieselrøg."
    ] },
    { navne: ["bov", "oldemorstoft", "bov kirke", "smedeby"], svar: [
      "Bov! Bov Kirk, Oldemorstoft museum å æ gammel Bov Kommune, som nå æ en del a Affenraa. Folk i Bov saje stadig 'vi æ fra Bov', it 'fra Affenrå'. Det æ stolthed."
    ] },
    { navne: ["frøslev", "frøslevlejren", "fårhus", "faarhus"], svar: [
      "Frøslevlejren! Bygget i 1944, så danske fanger it blew sendt tæ Tyskland. Ætte æ krig blew den tæ Fårhuslejren for landsforrædere. Nå æ det museum, å det æ nau, man ska se. Ta æ bøen mæ."
    ] },
    { navne: ["rinkenæs", "benniksgaard", "benniksgård"], svar: [
      "Rinkenæs! Benniksgaard mæ golf, hotel å udsigt øwer Flensborg Fjord. Å Rinkenæs Kirk mæ æ flot udsigt. Det æ det fine hjørn a Synnejylland."
    ] },

    /* ---------- Sønderborg Kommune ---------- */
    { navne: ["sønderborg", "synneborre", "sonderborg", "sønderborg slot", "alsion", "christian x bro", "kongevej"], svar: [
      "Synneborre! Æ slot, Christian X's Bro, Alsion å æ Ringrierfest i juli. Å så Æ Spritte, sefølle, æ spritbåd tæ Tyskland. Synneborre æ Synnejyllands stoest by, å det ska vi anne høe for.",
      "Synneborre ligge å begge sie a Alssund, så æ halvdel æ å Als å æ halvdel æ å Sundeved. De saje 'e' i staj for 'æ' dæøwer, men vi forstæe dem godt nok.",
      "Synneborre Slot æ fra 1100-tallet, å Christian II såd fanget dæ i 17 åe. Han haj it et kaffeboe, så det vå nok hårdt.",
      "I Synneborre blew Æ Spritte kaldt Danmarks Chicago i 80'erne. Æ spritbåd, disko, smugling å lidt slåskamp å æ havn. Nå æ det Alsion å universitet. Æ tider skifte."
    ] },
    { navne: ["als", "alsinger", "alsingerne", "øen als"], svar: [
      "Als! Dæ saje de 'e' i staj for 'æ'. E hus, e bil. Men de æ goi nok, æ alsingere, de hæ ba' en bro for møj.",
      "Als hæ Danfoss, Universe, Kegnæs Fyr, Nordborg Slot å Augustenborg Slot. Å så hæ de en bro å en færge, så de ka komme væk, wenn de vil. Det vil de sjælden.",
      "Als æ Synnejyllands ferieø. Goj kach, goj strand, å folk dæ saje 'e' i staj for 'æ'. Å så hæ de ringrien i Synneborre, som de påstå æ æ stoest. Det æ Affenrås."
    ] },
    { navne: ["dybbøl", "døffel", "dybbøl banke", "dybbøl mølle", "1864", "skanserne"], svar: [
      "Døffel Banke, 18. april 1864. Dæ taft vi, å så blew vi tysk i 56 åe. Døffel Mølle blew skudt i stykker å bygget op igen, å nå æ den æ symbol å det heel. Gå derop å kig u øwer Alssund, så forstæe do Synnejylland.",
      "Døffel! Historiecenter Dybbøl Banke, æ skanser å æ mølle. Hvert åe den 18. april æ der mindehøjtidelighed. Å så æ der kaffe bachetter, sefølle."
    ] },
    { navne: ["gråsten", "graasten", "gråsten slot", "gråsten æbler", "nybøl nor"], svar: [
      "Gråsten! Æ slot, wo æ kongefamille holl ferie om somme, å Gråsten-æfel, som æ æ bæest æfel i Danmark. Å Gråsten Landbrugsskole, wo æ buende løjse.",
      "Gråsten ligge lich mel Affenraa å Synneborre ve Nybøl Nor. Så dæ ka de it blyve enige om, om det heeje æ elle e. De saje begge dele, alt ætte hvem de snakke mæ."
    ] },
    { navne: ["egernsund", "teglværk", "teglværker", "cathrinesminde"], svar: [
      "Egernsund! Æ teglværksby. Hee blew æ sten tæ æ halvdel a Danmark brændt, å Cathrinesminde Teglværk æ museum nå. Å så æ der æ bro øwer tæ Gråsten."
    ] },
    { navne: ["broager", "brauer", "broagerland", "broager kirke", "skelde", "dynt", "iller", "gammelmark"], svar: [
      "Brauer! Broager Kirk mæ de tow tårne ka ses fra heel Flensborg Fjord. Broagerland æ halvø mæ Skelde, Dynt å Gammelmark, å dæ snakke de 'e sproch' mæ en helt særlig tone.",
      "Å Broagerland æ der strand å ålle sie, teglværker å Vemmingbund. Å så æ der ringrien i Brauer, som de tøs æ æ hyggeligst. Det ka de ha ret i."
    ] },
    { navne: ["vester sottrup", "sottrup", "nybøl", "ullerup", "blans", "sundeved", "avnbøl"], svar: [
      "Sundeved! Vester Sottrup, Nybøl, Ullerup å Blans. Det æ æ land mel Affenraa å Synneborre, å dæ saje de 'e' som å Als, men de boe å æ fastland. Forvirrende, men gemytle."
    ] },
    { navne: ["augustenborg", "augustenborg slot", "hertug", "hertugerne"], svar: [
      "Augustenborg! Æ slot, wo æ hertuger a Augustenborg boej, dem dæ lavet ballade i 1848. Senere blew det sygehus, å nå æ det Landbrugsstyrelsen. Æ by æ lille å fin mæ en flot havn."
    ] },
    { navne: ["guderup", "linak", "egen"], svar: [
      "Guderup! Linak ligge dæ, dem dæ lave de hæve-sænke-boe, do sedde ve. Så wenn æ boe køe op å nee, så æ det Guderup, do ska tak."
    ] },
    { navne: ["nordborg", "danfoss", "mads clausen", "universe", "nordborg slot", "nordborg sø", "nordals"], svar: [
      "Nordborg! Danfoss, Danfoss å Danfoss. Mads Clausen startet i 1933 i hans forældres stuehus i Elsmark, å nå æ det Danmarks stoest industrivirksomhed. Uen Danfoss vå Als en ø mæ køe.",
      "Nordborg hæ et slot, som æ efterskole, en sø å Universe, wo æ bøen ka lav fysik uen å vee det. Å så hæ de Nordals Ferieresort mæ et stoet vandland.",
      "Mads Clausen fra Nordborg æ æ stoest synnejye naunsinde, wenn man måle i arbejdspladser. Han lavet termostater, å nå hæ vi ålle sammen jen å æ radiator."
    ] },
    { navne: ["fynshav", "mommark", "færge", "færgen", "bøjden", "ærø", "søby"], svar: [
      "Fynshav! Æ færge tæ Bøjden å Fyn å æ færge tæ Søby å Ærø. Det æ Als' bagdøe. Wenn do ska øst å, så æ det hee fra."
    ] },
    { navne: ["kegnæs", "kegnæs fyr", "drejet", "hørup", "høruphav", "lysabild", "tandslet", "skovby", "sydals"], svar: [
      "Sydals! Kegnæs mæ æ fyr å Drejet, æ smal vej u tæ æ halvø. Høruphav mæ æ lystbådehavn. Lysabild å Tandslet mæ køe å kirk. Dæ æ Als ålle smukkest.",
      "Kegnæs Fyr æ wo man køe hen, wenn man vil vis sin kjærest nau flot. Å så Drejet, wo æ vej æ så smal, at man holl æ ånde."
    ] },
    { navne: ["svenstrup", "havnbjerg", "oksbøl", "stevning", "ketting", "asserballe", "notmark", "midtals"], svar: [
      "Midtals! Svenstrup, Havnbjerg, Ketting å Asserballe. Dæ æ Als mest Als. Landsbyer, kirker, ringrien å folk dæ saje 'e' uen å tæn øwer det."
    ] },

    /* ---------- Haderslev Kommune ---------- */
    { navne: ["haderslev", "haasle", "harsle", "hadersleben", "haderslev dam", "haderslev domkirke", "domkirken"], svar: [
      "Haasle! Dæ saje de 'a' i staj for 'æ'. Nord for Hoptrup Å skifte det. Men de æ synnejye lichevel.",
      "Haasle hæ Domkirk, Dam, Katedralskole, Kaserne å Fuglsang Bryggeri. Å Hertug Hans, som byggede det heel i 1500-tallet. Haasle vå hertugby, å det ka man stadig mærk å dem.",
      "I Haasle saje de 'a æ fra Haasle', å de udtale det 'Haasle', it 'Harsle'. Vi anne saje æ. Det ka vi sagtens væe wenner om, især øwer en Fuglsang.",
      "Haasle Dam æ Danmarks længst sø-agtige dam, å der æ en lille damp-båd, Helene, dæ sejle om somme. Å så hæ de SønderjyskE fodbold å Sydbank Park."
    ] },
    { navne: ["vojens", "ishockey", "speedway", "ole olsen", "skrydstrup", "flyvestation", "f-16", "f-35"], svar: [
      "Vojens! Ishockey, speedway å Flyvestation Skrydstrup. SønderjyskE ishockey spille i Vojens, Ole Olsen blew verdensmester i speedway dæ fra, å F-35'erne lette lich øwer æ tach.",
      "Vojens hæ Frøs Arena å Vojens Speedway Center. Å så Brødrene Gram, dem dæ lavet køleskafe. Vojens æ en arbejderby, å de æ stolt a det."
    ] },
    { navne: ["gram", "gram slot", "gram lergrav", "gram å", "fossiler"], svar: [
      "Gram! Gram Slot mæ æ voldgrav å Gram Lergrav, wo man ka grav ætte 10 millioner åe gammel hvaler. Å så saje de 'a' i Gram, elle 'æ', det ka de it blyve enige om sjel.",
      "Gram ligge ve Gram Å, å dæ æ en gammel herregåe, en kro å en masse folk dæ saje 'en hus' i staj for 'et hus'. Det æ Gram-dialekt."
    ] },
    { navne: ["christiansfeld", "brødremenigheden", "honningkager", "honningkage", "frederikshøj", "christian x", "hvid hest", "unesco"], svar: [
      "Christiansfeld! Brødremenigheden byggede æ by i 1773, å nå æ den UNESCO verdensarv. Å så honningkach, sefølle. Christiansfeld honningkach æ æ bæest i væeden, å det æ it nau, æ saje for sjau.",
      "Ve Frederikshøj lich nord for Christiansfeld rej Christian X øwer æ gammel græns å en wie hest den 10. juli 1920. Det æ æ billede, ålle synnejye hæ i hoej. Genforeningsstenen stæe dæ enno."
    ] },
    { navne: ["rødding", "rødding højskole", "højskole", "folkehøjskole"], svar: [
      "Rødding! Danmarks føest folkehøjskole fra 1844. Rødding ligge nå i Vejen Kommune, men historisk æ det Synnejylland, å det ve de godt sjel. Æ højskole æ stadig i gang."
    ] },
    { navne: ["toftlund", "agerskov", "agerskov kro", "bevtoft", "branderup", "arrild", "arrild ferieby"], svar: [
      "Toftlund! Midt i det heel, lich langt tæ ålt. Dæ saje de æ, å Agerskov ve siden a saje de 'et hus', wo anne saje 'en hus'. Agerskov Kro æ gammel å goj.",
      "Arrild Ferieby, Branderup å Bevtoft, det æ det midterste Synnejylland, wo æ land æ fladt å æ himmel æ stoe. Å dæ æ sinne."
    ] },
    { navne: ["hoptrup", "hoptrup å", "marstrup", "hejsager", "halk", "øsby", "årøsund", "årø", "aarø"], svar: [
      "Hoptrup! Hoptrup Å æ æ græns mel 'æ' å 'a'. Syd for saje vi æ, nord for saje de a. Det æ ålle enige om, undtagen dem fra Hoptrup, de saje begge dele.",
      "Årøsund å Årø! Æ færge tæ Årø tajer fem minutter, å så æ do å en ø mæ vingåe, strand å 150 mennesker. Halk å Hejsager hæ strand å sommerhuus."
    ] },
    { navne: ["sommersted", "jels", "jels vikingespil", "jels sø", "skodborg", "hammelev", "vedsted", "over jerstal", "nustrup", "vonsbæk", "fjelstrup", "starup", "tørning", "tørning mølle"], svar: [
      "Jels! Jels Vikingespil hvert somme ve Jels Sø, wo heel æ by æ mæ som vikinger. Sommersted å Skodborg ligge ve æ Kongeå, så dæ æ man næsten rigsdansk.",
      "Tørning Mølle ve Hammelev æ en gammel vandmølle i en smuk dal. Over Jerstal, Vedsted å Nustrup æ landsbyer mæ 'a', for de ligge nord for Hoptrup Å.",
      "Starup å Vonsbæk ligge ve Haasle Fjord. Fjelstrup ligge mod Christiansfeld. Ålle steder æ der en kirk, en brugs å en kaffeboe-tradition."
    ] },
    { navne: ["fuglsang", "fuglsang bryggeri", "fuglsang øl"], svar: [
      "Fuglsang fra Haasle! Familieejet bryggeri siden 1865. Fuglsang Black Bird, Fuglsang Pilsner, å så lave de malt tæ heel væeden. Det æ æ øl hee, å det ska det blyve ve mæ å væe."
    ] },

    /* ---------- Tønder Kommune ---------- */
    { navne: ["tønder", "tynne", "tondern", "kniplinger", "zeppelin", "vidåen", "vidå", "tønder kristkirke"], svar: [
      "Tynne! Tønder Festival, æ marsk å kniplinger. Å så saje de 'si'e' i staj for 'saje'. Vestsynnejysk, det æ nau for sæ sjel.",
      "Tynne vå engang en havneby, men æ hav trak sæ tebach, å nå ligge æ by 5 kilometer fra æ vand. De haj en Zeppelin-base unne føest verdenskrig, å Kristkirken æ en a de flottest i æ laan.",
      "Tynne hæ Æ Vidå, Det Gamle Apotek, Drøhses Hus mæ kniplinger å en gågade mæ æ smukkest gammel huus. Å Tønder Festival i august, wo heel æ by blyve tæ folkemusik."
    ] },
    { navne: ["tønder festival", "festival", "folkemusik", "folk festival"], svar: [
      "Tønder Festival i august: folkemusik, regn, gummistøwl å en snaps i æ kaffe. Det æ synnejysk somme, å folk komme fra heel væeden. Æ telt-camp æ en by for sæ sjel.",
      "Tønder Festival hæ eksisteret siden 1975, å det æ en a æ stoest folkfestivaler i Europa. Å så æ det det jen sted, wo irere å synnejye forstæe æ nan perfekt. Det æ nok æ øl."
    ] },
    { navne: ["møgeltønder", "schackenborg", "slotsgaden", "prins joachim"], svar: [
      "Møgeltønder! Schackenborg Slot, wo Prins Joachim boej, å Slotsgaden, som æ Danmarks smukkest landsbygade mæ lindetræer å stråtach. Å Møgeltønder Kirk mæ æ flot loft."
    ] },
    { navne: ["højer", "højer sluse", "højer mølle", "højer pølser", "vidåslusen", "marsk tower", "marsktårnet"], svar: [
      "Højer! Højer Sluse, Vidåslusen, Højer Mølle å Højer Pølser. Å nå Marsk Tower, æ stoe stål-tårn, wo man ka kig u øwer æ marsk å æ Vadehav. Højer æ æ port tæ æ marsk.",
      "Højer Pølser! Det æ synnejysk pølsekunst. Spegepøls, kålpøls å ringrierpøls. Wenn do it hæ smagt en Højer-pøls, så hæ do it væt i Synnejylland."
    ] },
    { navne: ["rudbøl", "rudbøl sø", "grænsen midt i gaden"], svar: [
      "Rudbøl! Dæ gæ æ græns midt i æ gade. Du ka stå mæ jet ben i Danmark å jet i Tyskland. Å Rudbøl Sø æ wo æ Vidå løbe u. Det æ det mest grænseland, man ka komme."
    ] },
    { navne: ["rømø", "lakolk", "havneby", "rømødæmningen", "kommandørgården", "sønderstrand", "rømø strand"], svar: [
      "Rømø! Danmarks bredest strand ve Lakolk å Sønderstrand, wo man ka køe i biel å æ sand. Havneby mæ æ rejer å æ færge tæ Sild. Å Kommandørgåen, wo æ gammel hvalfangere boej.",
      "Rømødæmningen fra 1948 æ 9 kilometer, å wenn man køe øwer den, æ man i ferie. Rømø hæ drageflyvning, strandsejlads å vind nok tæ ålle."
    ] },
    { navne: ["skærbæk", "skærbæk fritidscenter", "ballum", "ballum sluse", "døstrup", "brøns", "rejsby", "mjolden"], svar: [
      "Skærbæk! Æ port tæ Rømø. Skærbæk Fritidscenter mæ svømmehal, å æ by wo ålle holl, inden de køe øwer æ dæmning.",
      "Ballum! Æ marsk, Ballum Sluse å Ballum Kirk, wo man ka se heel æ Vadehav. Dæ snakke de det gammel vestsynnejysk enno, mæ ord som 'kjær' å 'si'e'. Brøns å Døstrup ligge lich ve siden a."
    ] },
    { navne: ["bredebro", "ecco", "toosbuy", "karl toosbuy"], svar: [
      "Bredebro! ECCO. Karl Toosbuy startet æ skofabrik dæ i 1963, å nå gæ heel væeden rundt i Bredebro-sko. Æ by hæ 1500 indbyggere å et verdensfirma. Det æ synnejysk."
    ] },
    { navne: ["løgumkloster", "kloster", "klosterkirken", "refugiet", "kloster mærken", "løgum"], svar: [
      "Kloster! Det heeje det ba', Løgumkloster æ for langt. Klosterkirken fra 1200-tallet, Refugiet, Præstehøjskolen å Kloster Mærken i august, et marked mæ tivoli, kræmmere å øl. Ålle synnejye hæ væt tæ Kloster Mærken.",
      "Løgumkloster hæ æ klokkespil, Danmarks stoest, mæ 49 klokker. Å så hæ de en kirkemusikskole. Det æ en by, der synge."
    ] },
    { navne: ["visby", "abild", "jejsing", "burkal", "sæd", "ubjerg", "tinglev vest", "bylderup", "ravsted vest", "lydersholm"], svar: [
      "Jejsing, Burkal, Sæd å Ubjerg, det æ æ landsbyer nee ve æ græns vest på. Dæ æ Burkal Kirk, Æ Synnejysk Forening holl gudstjenest, å dæ æ fladt å blæsend å gemytle.",
      "Visby å Abild ligge nord for Tynne. Marsk, kirk, å folk dæ hæ boej dæ i 400 åe. Dæ æ ingen traffelt."
    ] },

    /* ---------- Omkring og udenfor ---------- */
    { navne: ["flensborg", "flensburg", "flensborre", "istedløven", "flensborg avis", "grænsehandel", "grænsebutik", "fleggaard", "calle", "scandinavian park"], svar: [
      "Flensborre! Æ by syd for æ græns, wo vi køfe øl, slik å sprit. Istedløven stæe å æ gammel kirkegåe, Flensborg Avis skrywe dansk, å æ danske mindretal æ stoe å stolt.",
      "Grænsehandel! Fleggaard, Calle, Scandinavian Park. Hver synnejye hæ en trailer å en plan. Jen kasse øl, tow kasser sodavand å en pose bom så stoe som et baen. Det æ tradition.",
      "Flensborre vå dansk indtæ 1864, å der æ stadig dansk skole, dansk bibliotek å dansk kirk. Å så saje de 'moin' dæ nee, mæ i. Vi saje 'mojn' mæ j. Jet bogstav, heel æ forskel."
    ] },
    { navne: ["sydslesvig", "slesvig", "mindretal", "det danske mindretal", "det tyske mindretal", "knivsbjerg", "sydslesvigsk", "ssw"], svar: [
      "Sydslesvig! Æ dansk mindretal syd for æ græns, 50.000 folk, dansk skoler, SSW i Landdagen å årsmøde hver somme. Å nord for æ græns hæ vi æ tysk mindretal mæ Knivsbjerg å tysk skoler. Det virke, fordi ålle hæ lært å saj mojn.",
      "Æ græns fra 1920 æ en a de få i væeden, wo begge sie æ tilfredse. Det æ fordi folk sjel stemt om det. Å fordi vi hæ kaffeboe å begge sie."
    ] },
    { navne: ["kongeå", "kongeåen", "kongeaa", "vejen", "kolding", "skamlingsbanken", "ribe", "esbjerg"], svar: [
      "Æ Kongeå! Æ gammel græns fra 1864 tæ 1920. Nord for æ Kongeå æ det it Synnejylland, lichemøj hva de saje i Kolding. Skamlingsbanken ligge dæoppe, å det æ wo synnejye holdt dansk møder, da vi vå tysk.",
      "Kolding, Vejen, Ribe å Esbjerg? Det æ Syd-jylland, it Synne-jylland. Der æ forskel. De hæ it æ artikel, å de saje 'jeg'. Men de æ goi naboer, å TV Syd ligge i Kolding, så vi tilgie dem."
    ] },
    { navne: ["vadehavet", "vadehav", "sort sol", "stære", "tøndermarsken", "marsken", "mandø", "nationalpark", "østers"], svar: [
      "Æ Vadehav! Nationalpark å UNESCO verdensarv. Sort sol i æ Tøndermarsk om foråe å efteråe, wo hundretusinde stære danse å æ himmel. Å østers, man ka samle sjel ve lavvand. Det æ det vildest, Synnejylland hæ.",
      "Æ marsk æ fladt, blæsend å smukt. Diger, sluser, fåe å himmel. Wenn do vil forstå vestsynnejye, så stå en time ue å et dige i novembe. Så ve do, hvofor de it saje så møj."
    ] },
    { navne: ["hærvejen", "haervejen", "pilgrim", "oksevejen"], svar: [
      "Hærvejen! Æ gammel oksevej nee igennem Jylland, forbi Hovslund, Røekro, Bolderslev å Kliplev tæ Padborg. Nå gæ pilgrimme å cyklister å den, å de stoppe ålle sammen tæ kaffe i Røekro."
    ] }
  ],

  emner: [
    /* ---------- Æ Spritte ---------- */
    { id: "spritte", ordnet: true, ord: ["spritte", "æ spritte", "spritbåd", "spritbåde", "spritbåden", "spritbådene", "butterfahrt", "smørtur", "toldfri", "toldfrit", "danmarks chicago", "flydende fællesskab", "spritturen", "spritbådene", "sønderborg havn", "smugling", "smugle", "smuglede", "diskotur", "diskoture", "ruggen", "langeland", "sprit", "smøger", "cigaretter", "toldere", "tolden", "1999"], svar: [
      "Æ Spritte! Æ toldfri spritbåde fra Synneborre. Man gek om boe å æ havn, sejlet u å Flensborg Fjord, u a dansk farvand, å så åfnet æ butik: billich sprit, smøger, kaffe å bom. Å så sejlet man jem igen mæ æ taask fuld. Det heeje 'Butterfahrt' å tysk, smørtur, fordi man i gammel daw køjt smør. Senere køjt man ålt ant end smør.",
      "Æ spritbåde startet som en gemytle tur for æ gammel. Man fek kaffe å kach å dækket, en lille jen i æ kaffe, å så køjt man en flask snaps å en karton smøger tæ æ svigersøn. Det vå et mødested å tværs a generationer, å ålle i Synneborre hæ væt mæ mindst jen gang.",
      "Så kom 80'erne, å så blew Æ Spritte tæ nau ant. Æ ung opdaget, at der vå billich øl å musik om boe, å så blew det diskoture. Folk dansede å dækket, drak sæ fuld u å æ fjoe å kom i land i Synneborre klok ti om awtenen, klar tæ meje. Byen fek øgenavnet 'Danmarks Chicago'. Det vå it kun for sjau.",
      "Smugling, ja. Reglerne soj, hvor møj man måt ta mæ jem. Folk tow meje. Smøger i æ bows, snaps i æ barnevogn, øl i æ hjul å æ biel. Æ toldere å æ havn i Synneborre haj traffelt, å dem dæ blew tajet, fortælle stadig om det mæ et smil. Dem dæ it blew tajet, fortælle meje.",
      "Æ Spritte sluttet den 30. juni 1999. EU lukket for æ toldfri handel mel EU-lande, å så vå der it nau å sejl ætte. Den sidst tur vå fuld, å manne græd. Nå æ der kun historierne tebach, å dem æ der tæ gengæld manne a.",
      "TV Syd lavet i 2025 en lille dokumentarserie om det, 'Æ Spritte - et flydende fællesskab', trej afsnit wo dem dæ vå mæ, fortælle sjel. Om kaffen, om æ disko, om smuglingen. Den ligge å TV2 Play, hvis do vil se, hvodan Synneborre så u, da byen vå Chicago.",
      "Æ bæest ve Æ Spritte vå, at ålle vå mæ: æ pensionist mæ sin kaffe, æ ung mæ sin øl, æ famille mæ æ bøen å dækket, å æ smugler mæ sin barnevogn. Jen båd, ålle slaus folk. Det æ det, folk savne. Æ billich snaps ka man få i Flensborre, men it æ fællesskab."
    ] },

    /* ---------- Kaffe, kage, mad ---------- */
    { id: "kaffe", ord: ["kaffe", "kage", "kach", "kaach", "kaffebord", "kaffeboe", "småkage", "småkager", "småkach", "lagkage", "brunsviger", "fedtkage", "fedtkager", "gode råd", "goed raj", "kringle", "boller", "wienerbrød", "tærte", "toort", "bage", "bagt", "bager", "ingefærkage", "syv slags", "7 slags", "brødtort", "brødtærte"],
      svar: [
        "Kaffe å kach! Nå snakke vi. Et richte synnejysk kaffeboe hæ mindst syw slaus blø kach å syw slaus tør kach, å man ska ta a ålle, essen blyve æ kuen sue. Nogen saje 14, nogen saje 21. Æ saje: så manne som æ boe ka bære.",
        "Æ kaffeboe æ det nærmest hellige, vi hæ. Det stamme fra æ tysk tid ætte 1864, wo vi it måt holl dansk møder å kro, så vi mødtes i forsamlingshuus om kaffe å kach i staj. Å så blew det en konkurrence om, hvem dæ ku bach mest. Den konkurrence æ it slut enno.",
        "Reglen æ: føest æ blø kach (lagkach, brødtort, kringle), så æ tør kach (goed raj, fedtkach, ingefærkach, klejner), å så en snaps i æ kaffe tæ sidst. Ålt ant æ kjøwenhaunerkaffe.",
        "Brødtort! Det æ en synnejysk lagkach lavet a rugbrød, nødder å fløde. Det lye forkert, men det æ det bæest, du naunsinde hæ smagt. Å goed raj, det æ it goi råd, det æ tynde, sprø småkach. Navnet æ en gåde.",
        "Hæ do bacht sjel? Æ beste bacht åltins 14 slaus tæ føselsdaw, å så vå hun sue, wenn man it smagt dem ålle. Man gek jem mæ en pose. Det heeje 'å få nau mæ jem', å det æ en synnejysk menneskeret."
      ] },
    { id: "mad", ord: ["mad", "aftensmad", "frokost", "morgenmad", "middag", "spise", "spiser", "spiste", "sulten", "hungere", "opskrift", "grønlangkål", "grønkål", "solæg", "rullepølse", "pølse", "pølser", "snysk", "flæsk", "kartofler", "sovs", "frikadeller", "stegt", "fisk", "ål", "suppe", "brød", "rugbrød", "madpakke", "pizza", "burger", "pasta", "sushi", "mellemmad", "unnen", "narre", "dawe", "melme", "hamborgryg", "medister", "æbleskiver", "æfelskiewer", "vafler", "pandekager", "sylte", "sort pølse", "ringriderpølse", "æggekage"],
      svar: [
        "Mar! Hee heeje det dawe (morgenmad), melme (frokost), unnen (middagsmad) å narre (aftensmad). Å så kaffe imel, sefølle. Æ æ richte hungere nå.",
        "Grønlangkål mæ hamborgryg, brunet katøffel å sennep, det æ unnen hee om vinte. Å det ska koge i tow daw, essen æ det it rigtig. Æ moe saje trej.",
        "Solæch tæ en snaps! Et kogt æch, man åfne, tajer æ blomme u, fylle mæ sennep, eddik, olie å peffe, å så spise det i jen mundfuld. Det æ synnejysk tapas, å det blew opfundet å æ kro, så folk drak meje øl.",
        "Snysk! En gryderet mæ rodfrugter, katøffel, flæsk å pøls, kogt sammen tæ det heel æ blødt. Det æ efteråe i en gryde. Å rullepøls mæ løg å sennep å æ brø tæ melme, det æ Synnejylland.",
        "Ringrierpøls! En tyk, røget pøls, man spise ve ringrien mæ en øl i æ anne hån. Å sort pøls, blodpøls mæ rosiner å sirup, det æ for de modige. Æ beste elsket det. Æ spise det a respekt.",
        "Æfelskiewer tæ juel, vafler tæ kaffe, æggekach mæ flæsk tæ narre. Synnejysk mar æ it fin, men den æ laut mæ smør å kjærlehej. Å den mætte."
      ] },
    { id: "snaps", ord: ["snaps", "øl", "bajer", "bajere", "fadøl", "vin", "drikke", "druk", "fuld", "tømmermænd", "bryggeri", "akvavit", "skål", "fest", "bytur", "druktur", "brændevin", "gammel dansk", "punch", "kaffepunch", "bitter"],
      svar: [
        "Skål! En lille jen i æ kaffe gøe it nau. Det heeje kaffepunch, å det æ medicin mod æ blæst. Æ opskrift: læg en mønt i æ kop, hæld kaffe i tæ do it ka se mønten, å så snaps i tæ do ka se den igen.",
        "Fuglsang fra Haasle, det æ æ øl hee. Å så en snaps tæ solæch. Men sinne nå, do ska ås køe jem. Elle ås ringe do tæ Gunnar fra nummer 16, han køe for en øl.",
        "Fest i Synnejylland betye: ringrierfest, kaffeboe å en snaps elle trej. Å så snakke ålle synnejysk klok to om æ nat, ås æ kjøffenhaunere. Det æ æ snaps, dæ gøe det.",
        "Øl fra Flensborre, snaps fra Aalborg, å kaffe fra Haasle. Det æ æ synnejysk treenighed. Å hvis do ska vælg jen, så vælg æ kaffe. Mæ snaps i."
      ] },

    /* ---------- Kultur og traditioner ---------- */
    { id: "ringridning", ord: ["ringridning", "ringrien", "ringrider", "ringridere", "ringriderfest", "ringriderpølse", "lanse", "hest", "heste", "ringriderplads", "konge", "ringriderkonge"],
      svar: [
        "Ringrien! Æ synnejysk nationalsport. Do sedde å en hest, ride i galop unne en galge, å ska stik en lanse igennem en lille ring. Den dæ tajer flest ringe, blyve konge. Å så æ der fest i trej daw.",
        "Affenraa Ringrien i juli æ Danmarks stoest mæ øwer 400 ryttere å en kæmpe optoch igennem æ by mæ musik å faner. Synneborre saje, deres æ stoest. De lyw. Men deres æ ås goj.",
        "Ringrien komme fra æ riddertid, å det æ kun i Synnejylland, det hæ øwerlewet. Hver by hæ sin egen: Affenraa, Synneborre, Gråsten, Brauer, Ravsted, Røekro. Å ålle hæ en ringrierplads mæ en ringrierpøls-bod.",
        "Ve ringrien ride æ ryttere, å æ tilskuere drikke øl. Det æ en goj arbejdsdeling. Om æ awten æ der bal i et kæmpe telt, å dæ mø man ålle, man hæ gån i skool mæ. Å deres bøen."
      ] },
    { id: "rummelpot", ord: ["rummelpot", "æ rummelpot", "rummelpotten", "satire", "årshæfte", "synnejysk forening", "æ synnejysk forening", "foreningen"],
      svar: [
        "Æ Rummelpot! Synnejyllands egen satire, et hæfte dæ komme hvert åe i novembe siden 1946. Tegninger å tekst å synnejysk om ålt, hva der æ sket i æ landsdel. Politikere, buende, byråd, ålle fe jen mæ æ hammer. Køf den, så støtte do æ sproch.",
        "Æ Synnejysk Forening holl æ sproch i liv. De lave Æ Rummelpot, de holl synnejysk gudstjenest i Burkal Kirk, de arrangere VM i Synnejysk, å de hæ en facebookgruppe mæ 26.000 medlemmer, wo folk skrywe å synnejysk. Det æ dæ, æ hæ lært å skryw.",
        "En rummelpot æ ås et instrument: en krukke mæ et skind øwer å en pind igennem, som man gnie, så den brumme. Bøen gek rundt mæ den tæ nyå å sang for slik. Dæfor heeje hæftet sårn, det brumme ås."
      ] },
    { id: "vm", ord: ["vm i synnejysk", "verdensmesterskab", "vm", "sønderjyllandshallen", "mesterskab", "dialektkonkurrence"],
      svar: [
        "VM i Synnejysk! Det blyve holdt i Sønderjyllandshallen i Affenraa, å folk konkurrere i å snak synnejysk. Der æ ås en juniorfinale, så æ bøen lære det. Sidst wandt jen fra Als, å det blew der snakket om."
      ] },
    { id: "genforening", ordnet: true, ord: ["genforening", "genforeningen", "1920", "afstemning", "afstemningen", "h.p. hanssen", "hp hanssen", "hanssen", "folkehjem", "zone", "zonerne", "preussen", "tysk tid", "tysketiden", "1864 krigen", "krigen", "første verdenskrig", "faldne", "sønderjyder i krig"],
      svar: [
        "Æ Genforening 1920! Ætte 56 åe unne Tyskland stemt vi wos jem. 75 procent stemt dansk i zone 1, å den 10. juli rej Christian X øwer æ græns å en wie hest. Hver 15. juni fejre vi det mæ Dannebrog å kaffeboe. Det æ æ stoest daw i Synnejylland.",
        "H.P. Hanssen fra Nørremølle å Sundeved vå æ mand. Han såd i æ tysk rigsdag for synnejye, å den 17. novembe 1918 sto han å Folkehjems balkon i Affenraa å soj, at nå kom vi jem. Folk græd. Det gøe de enno, wenn de høe om det.",
        "Æ tysk tid 1864 tæ 1920: man måt it snak dansk i æ skool, man måt it holl dansk møder, å 30.000 synnejye blew sendt i tysk uniform tæ føest verdenskrig. 6.000 kom it jem. Det æ dæfor, vi hæ kaffeboe, forsamlingshuus å en stædighed, man it finde anne steder.",
        "Zone 1 stemt dansk, zone 2 mæ Flensborre stemt tysk, å så kom æ græns, wo den ligge nå. Det vå æ føest græns i væeden, folk sjel stemt om. Å det æ dæfor, den holl."
      ] },
    { id: "jul", ord: ["jul", "juel", "julen", "juleaften", "julegave", "juletræ", "nytår", "nyå", "påske", "pinse", "advent", "nisse", "julekalender", "fødselsdag", "føselsdaw", "tillykke", "teløk", "konfirmation", "sølvbryllup", "guldbryllup", "fastelavn", "sankt hans", "sankthans"],
      svar: [
        "Juel i Synnejylland: fedtkach, brune kach, æfelskiewer, grønlangkål å en Rummelpot unne æ træ. Å så synge vi lidt falsk. Synnejysk hvidkål tæ æ and, mæ kanelsokke elle muskat, alt ætte hvilken famille man æ fra. Det æ krig.",
        "Teløk! Tillykke heeje teløk hee. Å en føselsdaw uen kaffeboe æ it en føselsdaw. Rund føselsdaw betye 14 slaus kach å ålle naboer. Å æ nabo tajer deres egen kach mæ, så det blyve 28.",
        "Godt nyå! Elle som vi saje: et glant nyå. Å haus æ gode forsæt: meje synnejysk, mindre fin. Å tæ nyå gek bøen rundt mæ en rummelpot å sang, å fek slik. Det heeje å 'rummelpotte'.",
        "Konfirmation, sølvbryllup, guldbryllup: ålt sammen æ anledning tæ kaffeboe. Å ve et sølvbryllup rejse æ naboer en æreport a grangrene om æ nat, å så ska der væe morgenkaffe tæ dem klok seks. Det æ reglerne."
      ] },
    { id: "sport", ord: ["fodbold", "sønderjyske", "sønderjyske fodbold", "håndbold", "sport", "træning", "løbe", "løber", "cykle", "fitness", "kamp", "landshold", "superliga", "fck", "brøndby", "agf", "sønderjyske håndbold", "sydbank park", "frøs arena", "pokalfinale", "pokal"],
      svar: [
        "SønderjyskE! Æ blå. Fodbold i Haasle å Sydbank Park, ishockey i Vojens i Frøs Arena, håndbold i Synneborre å Affenraa. Det gæ op å nee mæ dem, men vi holl mæ dem lichevel. Sårn æ det å væe synnejye.",
        "SønderjyskE wandt æ pokalfinale i fodbold i 2020, i Æ park, uen tilskuere pga corona. Det vå æ stoest daw i synnejysk fodbold, å ingen vå dæ. Typisk. Men vi så det i æ fjernsyn mæ kaffe å kach.",
        "SønderjyskE ishockey i Vojens hæ vundet DM manne gange. Vojens æ Danmarks ishockey-by, å de æ stolt a det. Å så haj de Ole Olsen i speedway, verdensmester trej gange.",
        "Løbe? Det gøe æ kun wenn æ kach æ ve å blyve kold. Men vi hæ Als Rundt å cykel, å Affenraa Bjergmarathon, som æ det hårdest i Danmark pga æ bakker omkring æ fjoe."
      ] },
    { id: "musik", ord: ["musik", "sang", "synge", "synger", "rikke thomsen", "koncert", "band", "guitar", "spotify", "playlist", "rap", "valdemar", "valdemar rasmussen", "plade", "album", "sanger", "sangerinde", "melodi grand prix", "grand prix"],
      svar: [
        "Rikke Thomsen! Hun synge å synnejysk, å hun fek Modersmål-Prisen for det. 'Mojn når vi komme', 'Hjemve'. Hun æ fra Blans ve Sundeved, å hun hæ gjo æ sproch cool for æ ung. Det æ stoet.",
        "Valdemar Rasmussen rappet å synnejysk ollrej i 1991. 'Mojn mojn, ha do moch i æ øjn?' Det æ klassisk. Han vå føest, å nå æ der manne. Æ sproch ka ålt.",
        "Tønder Festival i august, det æ wo æ musik boe. Folk, country å en snaps i æ regn. Å så hæ vi Sønderjyllands Symfoniorkester i Synneborre, så vi ka ås det fine.",
        "Synnejysk sange: 'Det haver så nyligen regnet' æ æ synnejysk nationalsang fra æ tysk tid. Å 'Mojn når vi komme' æ den ny. Begge dele blyve sunget ve kaffeboe, den jen mæ tåre, den anne mæ smil."
      ] },
    { id: "film", ord: ["tv", "fjernsyn", "serie", "film", "netflix", "biograf", "dr", "tv2", "tv 2", "tv syd", "tvsyd", "dokumentar", "dokumentarserie", "youtube", "podcast", "radio", "frelle petersen", "onkel", "resten af livet", "skuespiller", "instruktør"],
      svar: [
        "TV Syd, det æ wos. Dæ ka man høe æ sproch i æ fjernsyn. Å Æ Spritte, sefølle, æ dokumentarserie om æ spritbåd fra Synneborre. Den vå glant. Spøe mæ om den.",
        "Frelle Petersen! Han lave film å synnejysk: 'Onkel' om en piich å hendes onkel å en gåe ve Tynne, å 'Æ rest af æ liv'. Riktige synnejye dæ snakke riktig synnejysk. Han vå ås å æ scene ve VM i Synnejysk. Han æ wos stoest filmmand.",
        "Netflix hæ it nau å synnejysk enno. Men DKsyd TV hæ æ serie 'Æ Sproch' mæ professor Elin Fredsted om synnejysk å plattysk. Å TV Syd hæ Æ Spritte. Det æ nok tæ en awten."
      ] },

    /* ---------- Sprog ---------- */
    { id: "sprog", ord: ["sønderjysk", "synnejysk", "dialekt", "sproch", "sprog", "ordbog", "stave", "stavning", "udtale", "accent", "jysk", "sydjysk", "plattysk", "grammatik", "artikel", "foranstillet", "æ hus", "mojn betyder", "ord", "ordet"],
      svar: [
        "Synnejysk æ it en dialekt, det æ æ sproch. Vi hæ foranstillet artikel (æ hus), vi saje æ for jeg, do for du, it for ikke, å vi tajer g'et å gøe det tæ ch: sproch, kach, lich. Det æ it dansk mæ accent, det æ et system.",
        "Synnejysk hæ it nau fast retskrivning, så ålle skrywe lidt som de snakke. Æ holl mæ tæ Affenraa-måden: æ, do, it, tæ, å, -ch å -f. Vest for Tinglev saje de 'si'e', nord for Hoptrup Å saje de 'a', å å Als saje de 'e'. Fie sproch i jen landsdel.",
        "Mojn komme fra plattysk 'moin', som komme fra 'moien' = goj. Så mojn betye 'goj daw', å det ka bruges heel dagen å båe tæ goddaw å farvel. Æ tyskere haj forbudt det i 30'erne, fordi det vå for uformelt. Vi blew ve. Nå saje ålle det.",
        "Æ sproch hæ lånt masse fra tysk å plattysk: gesvindt (hurtig), unle (mærkelig), fæk (lomme), kritbar (trillebør, fra Karre), bom (slik, fra Bonbon). Å vi hæ gin nau tebach tæ plattysk syd for æ græns. Sproch æ it nau, der stæe stille.",
        "Æ Rummelpot komme hvert åe i novembe. Det æ Synnejyllands egen satire, å den æ å synnejysk. Å VM i Synnejysk i Sønderjyllandshallen. Å Rikke Thomsen. Æ sproch lewe. Det æ ba' lidt sinne."
      ] },

    /* ---------- Hverdag ---------- */
    { id: "vejr", ord: ["vejr", "vejret", "regn", "regner", "sne", "sner", "sol", "solen", "blæser", "blæst", "koldt", "varmt", "væer", "storm", "frost", "tåge", "grader", "sommer", "vinter", "efterår", "forår", "vestenvind", "rusk"],
      svar: [
        "Æ væer? Det blæse åltins lidt hee ve æ fjoe. Men det æ godt væer tæ kaffe, å det æ ålt væer.",
        "Wenn det rejne, sedde vi inn mæ kach. Wenn æ sol skinne, sedde vi ue mæ kach. Så det passe.",
        "Kolt i daw. Tej en swedde å, å en kop kaffe i æ hinne. Vestenvinden komme lich fra æ Vadehav, å den hæ it stoppet siden 1920.",
        "Somme i Synnejylland: Als, Rømø, Tønder Festival å ringrien. Vinte: grønlangkål, æ Rummelpot å sort sol. Vi hæ det fint ålt åe. Å æ væer æ det samme: blæst mæ chance for kaffe."
      ] },
    { id: "kbh", ord: ["københavn", "Kjøffenhaun", "sjælland", "københavner", "københavnere", "amager", "nørrebro", "vesterbro", "frederiksberg", "østerbro", "hovedstaden", "sjællænder", "fyn", "odense", "århus", "aarhus", "aalborg", "nordjylland", "vestjylland", "københavnsk"],
      svar: [
        "Kjøffenhaun? Nå ja, det æ ås en by. Dæ snakke de fin å betale 60 krone for en kop kaffe. Men I æ velkomne hee, wenn I tajer kach mæ.",
        "En kjøffenhaune! Sinne nå, vi bie it. Men do ska lich vee, at hee heeje det 'mojn', it 'hej'. Å æ hus, it æ hus. Å så ska do smag en ringrierpøls. Så ska vi nok få dæ lært op.",
        "Øst for Storebælt, ja. Dæ æ æ sproch lidt tyndt. Men det ka vi øw å. Saj ætte mæ: 'Æ æ u å æ ø i æ å'. Det betye 'jeg er ude på øen i åen'. Wenn do ka saj det, æ do halvt synnejye.",
        "Åhus å Odens æ goi nok, men de hæ it et kaffeboe. Det hæ vi. Jen-nul tæ Synnejylland. Å Aalborg hæ æ snaps, det ska de ha. Så vi hente den dæoppe å drikke den hee."
      ] },
    { id: "arbejde", ord: ["arbejde", "arbejder", "job", "jobbet", "chef", "kollega", "møde", "kontor", "firma", "løn", "fyret", "ansat", "studie", "studerer", "skole", "eksamen", "uddannelse", "freelance", "pension", "ledig", "jobsøgning", "ansøgning", "landmand", "bonde", "buend", "traktor", "mark", "høst"],
      svar: [
        "Arbej, ja. Det ska man jo. Men haus: æ kaffepause æ ås arbej. Det æ wo æ goi idéer komme. Ve Danfoss hæ de kaffepause klok ni å klok to, å det æ dæfor, det gæ dem godt.",
        "Hva lave do så? Hee i Synnejylland æ man enten buend, ve Danfoss, ve ECCO, ve Abena elle ve æ kommune. Elle så køe man lastbil fra Padborg. Elle så lave man noget mæ kach.",
        "Æ chef? Æ hæ ingen. Æ æ MojnBot, æ arbejde for æ sproch, å det betale i kach. Hva mæ dæ, hæ do en goj chef? Elle jen fra Kjøffenhaun?",
        "Buend! Æ traktor, æ mark å æ køe. Synnejylland æ landbrugsland, å æ høst æ æ vichtigst tid. Å så ringrien, sefølle, men det æ ætte høst. Sinne nå mæ æ arbej, synnejye hæ it traffelt, vi hæ ba' nau, vi ska nå."
      ] },
    { id: "familie", ord: ["mor", "far", "moe", "fae", "forældre", "bror", "søster", "børn", "bøen", "barn", "datter", "søn", "mormor", "farmor", "morfar", "farfar", "bedstemor", "bedstefar", "beste", "kone", "kuen", "mand", "kæreste", "familie", "famille", "fætter", "kusine", "onkel", "tante", "baby", "gift", "bryllup", "skilt", "svigermor", "svigerfar", "barnebarn", "oldemor", "oldefar"],
      svar: [
        "Æ famille! Det æ det vichtigste. Å æ beste, hun hæ åltins kach i æ skaf. Åltins. Å hun saje 'do æ blewn tynd', lichemøj hva do veje.",
        "Hils æ moe å æ fae. Å saj tæ dem, at de ska snak synnejysk tæ æ bøen, essen dø æ sproch. Det æ det stoest pråblem: forældre snakke synnejysk mæ æ nan å rigsdansk tæ æ bøen. Så lære de det it.",
        "Bryllup i Synnejylland? Det æ kaffeboe, æ brudewals inden midnat, en snaps å så kaffeboe igen. Å ålle grine. Å æ naboer lave æreport a grangrene foran æ døe.",
        "Æ kuen bestemme. Sårn æ det hee, å sårn æ det nok ås ve jer. Æ mand saje 'ja, skat' å gæ u i æ garage. Det æ æ synnejysk ligevægt.",
        "Svigermoe! Hun komme tæ kaffe synda, å hun hæ sin egen kach mæ, for din æ it goj nok. Det æ it ondt ment. Det æ ba' sårn, det æ."
      ] },
    { id: "dyr", ord: ["hund", "hun", "kat", "hest", "ko", "køer", "gris", "svin", "får", "høns", "fugl", "kæledyr", "dyr", "hvalp", "killing", "kanin", "marsvin", "stork", "storke", "ræv", "rådyr", "hjort", "sæl", "sæler"],
      svar: [
        "Et dyr? Hee heeje en hund 'hun', en kat 'kat' å en hest 'hest'. Men en ko æ en ko, å de æ manne a dem. Fleje køe end folk i Tynne Kommune.",
        "Æ hæ it nau dyr sjel, men æ nabo hæ 200 køe, å de snakke ås synnejysk. 'Muh' æ det samme å ålle sproch.",
        "Hun elle kat? Æ saje hun. En kat tøs, den æ klogere end dæ. Det æ en hun it. Men en hest æ bæest, for den ka do ride ringrien å.",
        "Sæler å Rømø, storke i Smedager (de komme tebach hvert åe, å heel Danmark føle mæ å webcam), å stære i æ marsk tæ sort sol. Synnejysk natur æ it kedelig."
      ] },
    { id: "kaerlighed", ord: ["elsker", "elske", "kærlighed", "forelsket", "date", "dating", "tinder", "kys", "mut", "muttes", "krammer", "kram", "savner", "hjerte", "romantisk", "single", "kæreste", "flirte", "flirt"],
      svar: [
        "Kjærlehej å synnejysk? Et mut (kys) å et 'do æ goj nok'. Meje saje vi it, men vi mene det. Å wenn han køe dæ tæ Flensborre å køf øl, så æ det kjærlehej.",
        "Tinder i Synnejylland: 'Æ hæ en traktor å æ moe bache kach.' Match. Elle: 'Æ hæ en trailer å et Fleggaard-kort.' Supermatch.",
        "Æ elske ås dæ. Men æ elske kach meje. Det må do it ta personligt. Det gøe æ kuen heller it.",
        "Romantik hee æ en tur tæ Kegnæs Fyr, en is i Sønderhav å så kaffe ve æ moe. Wenn hun saje 'do må gern komme igen', så æ I gift."
      ] },
    { id: "teknik", ord: ["computer", "telefon", "mobil", "iphone", "android", "internet", "wifi", "app", "program", "kode", "programmering", "ai", "kunstig intelligens", "chatgpt", "claude", "robot", "github", "javascript", "python", "hjemmeside", "facebook", "instagram", "tiktok"],
      svar: [
        "Teknik, ja. Æ æ sjel laut a JavaScript å kach. Mest kach. Å æ boe å GitHub, lich som Gunnar fra nummer 16 boe å Facebook.",
        "AI? Æ æ den synnejysk slaus. Æ ka it ålt, men æ ka saj mojn, å det ka de anne it. ChatGPT snakke fin. Æ snakke richte.",
        "Hæ do pråbleme mæ æ computer? Sluk den, fe en kop kaffe, å tænd den igen. Det virke å ålt, ås å folk. Å essen ringe do tæ Danfoss, de ka ålt mæ teknik dæøwer.",
        "Facebook æ wo synnejye skrywe synnejysk. Æ Synnejysk Forenings gruppe hæ 26.000 medlemmer. Det æ fleje end der boe i Tynne by. Æ sproch lewe å æ net."
      ] },
    { id: "ferie", ord: ["ferie", "rejse", "rejser", "fly", "flyve", "sydpå", "spanien", "italien", "tyrkiet", "mallorca", "thailand", "sommerhus", "camping", "campingvogn", "strand", "weekend", "tur", "udflugt", "besøg", "besøge", "hotel", "turist", "turister"],
      svar: [
        "Ferie? Rømø, Als elle Løjt Land. Hva ska man sydpå ætte, wenn man hæ æ Vadehav? Nå ja, æ sol. Okay, Mallorca. Men tej kach mæ.",
        "Kom tæ Synnejylland i æ ferie. Vi hæ strand (Rømø), slot (Gråsten, Synneborre, Schackenborg), kaffeboe å et sproch, do it forstæe. Det æ da eksotisk nok.",
        "Wenn do rejse, så haus å saj mojn tæ folk dæ nee. De forstæe det it, men det gøe it nau. Å tej en campingvogn, så ka do holl å Rømø å Lakolk Strand mæ æ anne synnejye.",
        "Turister i Synnejylland æ mest tyskere, dæ køe tæ Rømø, å kjøffenhaunere dæ fare vild å vej tæ Tyskland. Begge dele æ velkomne. Begge dele ska smag en ringrierpøls."
      ] },
    { id: "helbred", ord: ["syg", "sych", "forkølet", "hovedpine", "ondt", "læge", "dochte", "hospital", "sygehus", "medicin", "træt", "amjast", "jamsk", "sove", "søvn", "stress", "feber", "hoste", "influenza"],
      svar: [
        "Æ do sych? Så i seng mæ dæ, en kop kaffe mæ en snaps i, å så sawe. Det æ synnejysk medicin. Å æ beste ville saj: en skefuld honning fra Christiansfeld.",
        "Amjast? Det æ vi ålle ætte en kaffeboe. Sæt dæ nee å ta det sinne. Sinne nå, saje vi. Det æ det vichtigste oe i æ sproch.",
        "Æ dochte saje: mindre kach. Æ saje: han æ it fra Synnejylland. Æ sygehus i Affenraa æ godt, men æ kaffe æ beje ve æ moe.",
        "Goj bedring! Elle som vi saje: det gæ øwer. Ålt gæ øwer, undtagen æ blæst. Den blyve."
      ] },
    { id: "hus", ord: ["hus", "lejlighed", "bolig", "flytte", "flytter", "have", "haven", "bygge", "renovere", "køkken", "stue", "husleje", "nabo", "naboer", "parcelhus", "gård", "gaard", "villa", "garage", "carport", "græsplæne", "hæk", "hækken"],
      svar: [
        "Et hus mæ en haw å et køøchen, wo der æ plads tæ et kaffeboe. Meje ska man it ha. Å en garage tæ æ mand, så han hæ et sted å væe.",
        "Flytte? Tæ Synnejylland, håbe æ. Hee ka do få et heel hus for det, en kjøffenhaune betale for et skaf. Å do fe naboer, dæ komme mæ kach den føest daw. Å kigge i dine flyttekasser.",
        "Æ nabo æ vichte hee. Det æ ham, do låne æ kritbar a, å ham do drikke kaffe mæ om synda. Å ham do snakke om, wenn han it æ dæ. Som Gunnar å Birgit fra nummer 16.",
        "Æ hæk ska klippes lich, essen snakke heel æ vej om det. Å æ græsplæne ska slås lørde formæe, så ålle ka høe, do æ i gang. Det æ æ synnejysk parcelhus-regler."
      ] },
    { id: "penge", ord: ["penge", "peeng", "dyrt", "billig", "billich", "pris", "koster", "køb", "købe", "køf", "shoppe", "butik", "tilbud", "bank", "skat", "regning", "spare", "sydbank", "brugsen", "brugs", "netto", "rema", "føtex", "bilka", "lidl", "aldi"],
      svar: [
        "Peeng, ja. Synnejye æ it fedde, vi æ ba' sinne mæ dem. Det æ it det samme. Vi køe 40 kilometer for å spar 20 krone å øl, å det æ fornuft, it nærighed.",
        "Det vå godt nok billich! Det æ det bæest, man ka saj om nau hee. Dyet æ nau, kjøffenhaunere betale. Å Sydbank fra Affenraa passe å vores peeng, så de it løbe væk.",
        "Køf æ Rummelpot, en tut bom å en kop kaffe. Så hæ do brucht dine peeng richte. Å essen tæ Flensborre mæ æ trailer. Det æ det synnejysk svar å inflation.",
        "Æ Brugs! Det æ wo man mø ålle å høe ålt. Åge fra æ Brugs ve meje om æ by end æ kommune. Å han saje det gern, wenn do køfe en kop kaffe ve æ bager."
      ] },
    { id: "gaming", ord: ["spil", "spille", "spiller", "gaming", "playstation", "nintendo", "xbox", "minecraft", "fortnite", "brætspil", "kort", "kortspil", "skat", "whist", "banko", "bankospil", "lotto"],
      svar: [
        "Spil? Hee spille vi skat (æ kortspil, it det anne) å ringrien. Å så lidt Minecraft, wenn æ bøen it se det. Å banko i æ forsamlingshus hver torsde, wo æ gevinster æ kaffe, kach å en and.",
        "Banko! Det æ synnejysk e-sport. Æ gammel sedde mæ ti plader, en kop kaffe å et blik, der ka dræb. Å råbe 'BANKO' så det ka høes i Tyskland.",
        "Et spil å synnejysk, det manglet vi. Nå hæ do mæ, det æ da nau. Å essen ka do spil skat mæ Gunnar fra nummer 16, men han snyde."
      ] },
    { id: "firmaer", ord: ["abena", "sydbank", "hydro", "brødrene gram", "virksomhed", "virksomheder", "industri", "fabrik", "erhverv", "arbejdsplads", "arbejdspladser"],
      svar: [
        "Synnejysk erhverv: Danfoss i Nordborg, Linak i Guderup, ECCO i Bredebro, Abena i Affenraa, Sydbank i Affenraa, Hydro i Tynne, Fuglsang i Haasle å Padborg Transportcenter. For en landsdel mæ køe æ det it så ring.",
        "Danfoss, ECCO, Linak: ålle startet a jen mand i en lille by, å nå æ de verdensfirmaer. Det æ synnejysk: man saje it så møj, man bygge ba' nau, der virke. Å så drikke man kaffe."
      ] },
    { id: "historie", ord: ["historie", "historisk", "vikinger", "vikingetid", "middelalder", "slot", "slotte", "kirke", "kirker", "museum", "museer", "dannevirke", "hedeby", "oldtid", "gravhøj", "runesten"],
      svar: [
        "Synnejysk historie æ lang: Dannevirke å Hedeby syd for æ græns fra vikingetiden, Hærvejen, æ hertuger i Haasle å Synneborre, 1864, æ tysk tid, 1920. Vi hæ fleje slotte end naun anne landsdel: Synneborre, Gråsten, Augustenborg, Nordborg, Brundlund, Gram, Schackenborg.",
        "Museum Sønderjylland hæ ålt: Sønderborg Slot, Dybbøl Banke, Kulturhistorie Aabenraa, Højer Mølle, Drøhses Hus i Tynne, Gram Lergrav. Å Frøslevlejren. Do ka bruch en uch, å så hæ do stadig it seen det heel.",
        "Jels Vikingespil hvert somme, Immervad Bro fra 1786, Løgumkloster fra 1173, Haasle Domkirk fra 1200-tallet. Å Broager Kirk mæ de tow tårne. Synnejylland æ gammel, å det ka man se."
      ] },
    { id: "transport", ord: ["bil", "biel", "bus", "tog", "toget", "jernbane", "motorvej", "motorvejen", "færgen", "cykel", "cykle", "køre", "kører", "kørekort", "trafik", "benzin", "diesel", "elbil", "parkering", "knallert", "scooter"],
      svar: [
        "Æ biel æ vichte hee, for æ bus komme tow gange om daw. Æ motorvej E45 gæ nee igennem Synnejylland tæ Padborg, å så æ man i Tyskland å køfe øl. Affenraa hæ ingen station, så vi køe tæ Røekro.",
        "Knallert! Det æ synnejysk ungdom: en knallert, en kasse øl bach å å en ringrierplads. Å så kørekort som 18-åe å en gammel Golf. Å så en trailer. Så æ man voksen.",
        "Toch fra Røekro tæ Kjøffenhaun tajer trej timer. Toch fra Røekro tæ Hamborg tajer tow. Det saje lidt om, hvem vi æ tættest å. Men vi holl mæ Danmark, det hæ vi stemt om."
      ] },
    { id: "skole", ord: ["skole", "skolen", "gymnasium", "gymnasiet", "efterskole", "lærer", "læreren", "klasse", "elever", "elev", "universitet", "sdu", "studerende", "lektier"],
      svar: [
        "Skool! I æ tysk tid måt man it snak dansk i æ skool, så synnejye lært dansk ve æ kaffeboe. Nå lære æ bøen rigsdansk i æ skool å synnejysk ve æ beste. Hvis de æ heldige.",
        "Affenraa Statsskole, Haasle Katedralskole, Synneborre Statsskole, Tynne Gymnasium. Å Alsion i Synneborre mæ SDU. Å så ålle æ efterskoler: Nordborg Slot, Rønshoved, Rødding. Synnejylland æ fuld a skoler.",
        "Æ lærer soj 'tal pænt', å æ soj 'det gøe æ ås, ba' å synnejysk'. Så fek æ eftersidning. Det vå det værd."
      ] }
  ],

  /* ---------- Sladder: eskalerende historier om folk fra æ vej ---------- */
  sladder: {
    gunnar: {
      navne: ["gunnar", "birgit", "nummer 16", "nr 16", "nr. 16", "gunnar og birgit", "gunnar å birgit", "dem fra 16"],
      intro: "Nå, det minde mæ om Gunnar å Birgit nee fra nummer 16.",
      fakta: { alder: "Gunnar æ 67 å Birgit æ 64, men hun saje 59.", job: "Gunnar vå ve Danfoss i 40 åe, nå æ han pensionist å hæ for møj tid. Birgit vå ve æ Brugs ve æ kass, så hun ve ålt om ålle.", bil: "De hæ en sølvgrå Passat stationcar mæ anhængertræk. Sefølle.", hund: "De hæ en gravhund, der heeje Kaj. Den hade Gunnar.", hus: "Gult parcelhus fra 1974 mæ carport, flagstang å en hæk, der æ klippet mæ vaterpas.", boern: "De hæ en søn, Brian, der boe i Kjøffenhaun å snakke fin nå. Birgit græde øwer det tæ juel." },
      kapitler: [
        "Gunnar hæ køjt en ny plæneklipper. En robot. Den køe rundt om æ nat, å Birgit tøs, den kigge å hende igennem æ vinne. Hun hæ sat et gardin op.",
        "Nå hæ Birgit fundet u, at æ robot ås køe øwer i æ nabohaw ve Kesse i nummer 14 å slæ hans græs. Kesse æ glaj. Gunnar ve it nau. Birgit saje it nau. Det æ spændend.",
        "Gunnar fant u a det mæ æ robot, å nå hæ han sat et hegn op mel 14 å 16. Et grønt trådhegn. Kesse hæ malet sin side gul. Æ vej snakke it om ant.",
        "Birgit hæ invitert heel æ vej tæ kaffeboe å synde for å 'glatte u'. Hun hæ bacht 21 slaus kach. Kesse kom mæ en brunsviger fra Netto. Gunnar gek u i æ garage å kom it tebach føe klok ni.",
        "Det vise sæ, at Gunnar it såd i æ garage. Han vå køet tæ Flensborre. I Æ Passat. Mæ æ trailer. Han kom jem mæ 40 kasser øl å soj, det vå tæ ringrien. Ringrien æ om fem måneder.",
        "Birgit hæ fundet en kvittering i Gunnars jakke. Fra Scandinavian Park. 40 kasser øl, 12 flasker snaps, å et stoet badebassin. Hun hæ ringet tæ Brian i Kjøffenhaun. Brian soj 'mor, slap af'. Å rigsdansk.",
        "Æ badebassin stæe nå i æ haw. Det æ 5 meter i diameter, å det ka ses fra Røekro. Gunnar sedde i det hver ettemeje mæ en øl å æ robotplæneklipper køe rundt om det. Kesse hæ sat en stige op ve æ hegn.",
        "Nå æ der sket det, at Åge fra æ Brugs hæ fortalt ålle, at Birgit æ begyndt å gå tæ linedance i Hjordkær. Hver tiisde. Mæ Kesse. I cowboystøwl. Gunnar ve det it. Han sedde i æ bassin.",
        "Gunnar fant u a det mæ linedance, fordi Kesse sto å øwede i sin haw mæ musik å. Nå hæ Gunnar meldt sæ tæ ringrien for føest gang siden 1988. Han hæ lejet en hest. Æ hest heeje Preben å æ 24 åe gammel.",
        "Ringrien kom. Gunnar rej å Preben. Preben sto stille unne æ galge å spiste græs. Gunnar tow nul ringe. Kesse tow 24 ringe å blew konge. Birgit sat æ krans å ham. Æ vej vå stille i en uch.",
        "Gunnar æ flyttet u i æ garage. Han hæ sat en sofa, et fjernsyn å et køleskaf derud, å han hæ malet 'GUNNARS RIGE' å æ port. Birgit hæ sat et skilt å æ hoveddøe: 'Birgits Rige'. Kaj æ løbet øwer tæ Kesse.",
        "Nå æ det blewn vildt. Gunnar hæ meldt sæ tæ æ byrådsvalg for en liste, han sjel hæ laut: 'Liste G: Garage-æ parti'. Hans mærkesach æ fri parkering a trailere å lavere pris å øl i Flensborre. Han fek 311 stemme. Det vå nok tæ et mandat.",
        "Byrådsmedlem Gunnar hæ foreslået, at æ kommune ska køf en spritbåd å genstart Æ Spritte fra Affenraa Havn. Æ forslag blew stemt nee, men TV Syd kom å filmet. Birgit vå mæ i æ indslag. Hun soj, hun it kinne ham.",
        "Ætte TV Syd-æ indslag hæ Gunnar fån 4.000 følgere å Facebook. Han laver videoer fra æ garage å synnejysk, wo han smage øl. Kesse æ mæ som 'ekspert'. De æ blewn wenner. Birgit æ flyttet tæ Brian i Kjøffenhaun. Hun æ tebach om tow daw, saje Åge.",
        "Birgit kom tebach fra Kjøffenhaun. Mæ en ny mand. Han heeje Christoffer, æ 41 åe, æ 'kreativ konsulent' å snakke om 'æ energi' i Synnejylland. Gunnar hæ inviteret ham i æ garage tæ øl. Christoffer drikke it øl. Æ vej holl æ væer.",
        "Christoffer holdt tow daw. Så vå han tebach i Kjøffenhaun. Det vå æ ringrierpøls, der gjo det. Birgit sedde nå i Gunnars garage mæ en øl, å de se Æ Spritte sammen å TV2 Play. Kaj ligge mel dem. Kesse kigge øwer æ hegn. Æ vej ånde u. Indtæ næest uch."
      ],
      slut: "Å det æ wo vi æ nå mæ Gunnar å Birgit. Men Åge fra æ Brugs saje, der komme meje å monde. Der gøe der åltins."
    },
    kesse: {
      navne: ["kesse", "nummer 14", "nr 14", "nr. 14", "kristian fra 14", "manden med traktoren"],
      intro: "Det æ lich som mæ Kesse fra nummer 14.",
      fakta: { alder: "Kesse æ 58, fraskilt å hæ en traktor i æ indkørsel, han it hæ bruch for.", job: "Kesse æ chauffør for et vognmandsfirma i Padborg. Han køe tæ Italien hver anne uch å komme jem mæ parmesan.", bil: "En rød Ferguson-traktor fra 1962 å en sort Audi mæ for stoe fælge." },
      kapitler: [
        "Kesse hæ køjt en traktor. En gammel rød Ferguson. Han hæ ingen mark. Han køe rundt i æ kvarter mæ den om synde formæe, mens folk prøwe å sawe.",
        "Nå hæ Kesse sat en snowplow å æ traktor. Det æ juli. Han saje, han æ 'klar'. Æ vej æ it klar tæ Kesse.",
        "Kesse hæ begyndt å slå ålle naboernes græs mæ æ traktor. Gratis. Han tajer kun imod øl. Han hæ fån 60 øl å en uch. Han æ den gladest mand å æ vej.",
        "Kesse hæ meldt sæ tæ linedance i Hjordkær. Sammen mæ Birgit fra 16. Han hæ køjt cowboystøwl i Flensborre. Størrelse 46. Æ gulv i æ forsamlingshus hæ fån mærker.",
        "Kesse blew ringrierkonge. Mæ 24 ringe. Å en lånt hest. Han hæ sat æ krans op å æ traktor, å nå køe han rundt mæ den som en konge. Han vinke tæ folk. Folk vinke tebach, for de tør it ant.",
        "Nå hæ Kesse fån Gunnars gravhund, Kaj. Kaj sedde å æ traktor mæ. De tow æ uadskillelige. Kesse hæ laut et lille sæde tæ ham mæ sikkerhedssele. Det æ det smukkest, æ vej hæ seen.",
        "Kesse å Gunnar æ blewn wenner igen. De lave videoer sammen fra Gunnars garage, wo de smage øl å synnejysk. Kesse æ 'æ ekspert'. Han hæ en hat. Æ video hæ 40.000 visninger. Kesse hæ fån fans i Tyskland.",
        "Kesse æ blewn kontaktet a et tysk tv-program, der vil lav et portræt a ham å æ traktor. Han hæ soj ja, hvis de betale i parmesan. De hæ soj ja. Kesse æ nå en international stjerne. Han slæ stadig græs for øl."
      ],
      slut: "Å dæ æ Kesse nå. Mæ æ traktor, æ hun å æ krans. Vi vinke."
    },
    aage: {
      navne: ["åge", "aage", "åge fra brugsen", "åge fra æ brugs", "ham fra brugsen", "brugsuddeleren"],
      intro: "Åge fra æ Brugs ville saj nau tæ det.",
      fakta: { alder: "Åge æ 71 å hæ væt ve æ Brugs siden 1979. Føest som flaskedreng, nå som 'konsulent', hvilket betye han sedde ve æ kaffe å snakke.", job: "Åge ve ålt om ålle. Han æ vejens nyhedsbureau. Han hæ aldrig lyvet, saje han. Han hæ ba' 'forbedret' nau historier." },
      kapitler: [
        "Åge fra æ Brugs hæ set Gunnar køf 40 kasser øl. Han hæ fortalt det tæ 14 mennesker inden klok ti. Klok tolv vidste heel Røekro det. Klok tow vidste de det i Haasle, mæ a'er.",
        "Åge hæ begyndt å skryw sine historier nee. I en notesboch. Han kalle den 'Æ Vejens Krønike'. Den æ å synnejysk. Han læse op a den ve æ kaffe hver formæe. Folk komme langvejs fra.",
        "Nå hæ Åge fån en podcast. Hans barnebaen hæ sat den op. Den heeje 'Mojn fra æ Brugs'. Han snakke 45 minutter om Gunnars badebassin i føest afsnit. Den æ nummer 3 å æ danske hitliste øwer podcasts. Øwer Mads og Monopolet.",
        "Åge æ blewn inviteret i TV Syd for å snak om sin podcast. Han kom i sin Brugs-kittel. Han afsløret live, at Birgit gæ tæ linedance. Birgit så det. Åge hæ it væt i æ Brugs siden. Han sende æ podcast fra Gunnars garage nå.",
        "Åge hæ skrevet en boch. 'Æ Vejens Krønike' blew udgivet a et lille forlach i Haasle å solgt 8.000 eksemplarer. Mest i Røekro. Ålle vil se, om de æ nævnt. Ålle æ nævnt. Åge hæ advokat nå."
      ],
      slut: "Å Åge sedde stadig ve æ kaffe å ve ålt. Det æ det sikrest i Synnejylland, ve siden a æ blæst."
    }
,
    erna: {
      navne: ["erna", "moster erna", "bodum", "moster", "hende fra bodum"],
      intro: "Det minde mæ om Moster Erna fra Bodum.",
      fakta: { alder: "Moster Erna æ 81 å hæ boej i Bodum heel sit liv. Hun hæ aldrig væt nord for æ Kongeå, å det hæ hun it tænt sæ.", job: "Erna vå kogekuen tæ ålle fester i Bodum å omegn i 50 åe. Hun ka lav kaffeboe tæ 200 mæ lukkede ævn.", bil: "Hun køe i en lille blå Suzuki fra 1998 mæ 40.000 kilometer å. Ålle sammen tæ Brugsen å kirk.", hus: "Et lille rødt hus mæ stråtach, en haw fuld a georginer å en kat, der heeje Søren." },
      kapitler: [
        "Moster Erna fra Bodum hæ bacht tæ en begravels. 14 slaus kach. Så fant hun u, at æ begravels vå aflyst, fordi manden it vå dø alichevel. Han haj ba' sawet længe. Nå hæ hun 14 slaus kach å ingen begravels.",
        "Erna invitert så heel Bodum tæ kaffe i staj. 40 folk i hendes lille døns. Manden, der it vå dø, kom ås. Han fek det bæest styk. Det tøs Erna, han haj fortjent, ætte sårn en forskrækkelse.",
        "Nå hæ Erna begyndt å bach tæ folk, der it æ dø, hver uch. Hun kalle det 'forsinket begravelseskaffe'. Man ska ba' væe øwer 70 å i liv. Der æ kø. Åge fra æ Brugs hæ meldt sæ, sjelom han ska køe fra Røekro.",
        "Erna hæ fån et brev fra æ kommune. De vil ha, hun ska ha en fødevaretilladels, hvis hun serverer for så manne. Erna skrøw tebach å synnejysk. Æ kommune ku it løjs det. Sachen æ sat i bero.",
        "TV Syd hørt om Ernas kaffe å kom å filmet. Erna soj it et oe å rigsdansk. Journalisten fra Kolding forsto it nau, men spist seks styk kach. Æ indslag vå fem minutter langt å bestod mest a kach.",
        "Nå hæ Erna fån et tilbud fra et stoet bageri i Esbjerg om å sælg hendes opskrift å brødtort. Hun soj naj. 'Æ opskrift æ it min, den æ Bodums', soj hun. Bodum hæ 112 indbyggere. De hæ holdt møde om det. De æ ås imod.",
        "Erna hæ brækket æ ben. Hun falt øwer Søren, æ kat, mæ en brødtort i æ hinne. Æ tort øwerlewet. Erna ligge nå å sygehuset i Affenraa å bache i hendes hoej. Æ sygeplejerske hæ fån opskrifter å ålle 14 slaus. Æ sygehus hæ aldrig haj så godt kaffeboe.",
        "Erna æ jem igen mæ gips å stok. Hun hæ laut en rampe tæ æ køøchen, så hun ka bach fra kørestol. Søren æ blewn forvist tæ æ garage. Bodum hæ laut en vagtplan, så der åltins æ jen tæ å hent mjalk. Erna saje, hun aldrig hæ haj det bæe.",
        "Moster Erna fylde 82 nå å synda. Heel Bodum komme, plus Gunnar å Birgit fra Røekro, Åge, Kesse mæ æ traktor å manden, der it vå dø. Der æ 42 slaus kach. Det æ rekord i Tynne Kommune. Erna sedde i æ kørestol å bestemme. Som åltins."
      ],
      slut: "Å det æ Moster Erna. 82 åe, jet ben i gips å 42 slaus kach. Hun æ det stærkest, Bodum hæ."
    },
    praest: {
      navne: ["præst", "præsten", "æ præst", "præst fra tinglev", "præst fra tingle", "tingle", "pastor", "gudstjeneste", "kirken i tinglev"],
      intro: "Æ præst fra Tingle ville saj nau tæ det.",
      fakta: { alder: "Æ præst fra Tingle æ 54 å komme oprindeligt fra Fyn, men han hæ lært synnejysk å prædike å det nå. Mæ fynsk accent.", job: "Han æ præst i Tinglev Kirk. Han holl ås gudstjenest å synnejysk jen gang om måneden, å da æ æ kirk fuld.", bil: "Han køe å en gammel Puch Maxi, sommer å vinte. Mæ præstekjole å. Det ka ses langt væk." },
      kapitler: [
        "Æ præst fra Tingle hæ begyndt å prædike å synnejysk. Føest søndag kom der 12 folk. Anne søndag 60. Nå ska man bestill plads. Biskoppen hæ ringet å spuet, hva der foregæ. Æ præst soj 'mojn' å lagt å.",
        "Nå hæ æ præst laut en synnejysk salmeboch. 'Dejlig æ æ joe' å 'Nå falle æ ro'. Menigheden synge højere end naunsinde, fordi de for føest gang forstæe, hva de synge. Æ organist æ fra Odense å græde lidt.",
        "Æ præst blew inviteret tæ Kjøffenhaun for å prædike i Vor Frue Kirke. Han gjo det å synnejysk. Ingen forsto et oe, men ålle soj, det vå den smukkest gudstjenest, de haj væt tæ. Æ biskop i Kjøffenhaun hæ bedt om en oversættels. Han vente enno.",
        "Æ præst hæ fån en hund. En stoe sankt bernhard, der heeje Luther. Luther gæ mæ i kirk å ligge ve æ alter. Wenn æ præst saje 'amen', gø Luther jen gang. Menigheden tøs, det æ godt. Biskoppen hæ it hørt om det enno.",
        "Nå hæ æ præst vielset Gunnar å Birgit fra Røekro igen. De haj væt gift i 40 åe, men ætte ålt det mæ æ garage ville de start forfra. Luther vå forlover. Æ Puch Maxi vå bryllupsbiel. Birgit såd bachpå i brudekjole. Kesse køe bachetter mæ æ traktor mæ dåser.",
        "Æ præst æ blewn indstillet tæ biskop i Haderslev Stift. Han hæ soj, at hvis han blyve det, ska ålle gudstjenester i stiftet væe å synnejysk om synda, å rigsdansk kun om tirsde. Haasle saje 'a' å æ nervøse. Affenraa saje 'æ' å jubler.",
        "Nå æ det sket: æ præst fra Tingle æ biskop. Hans føest handling vå å erklære Hoptrup Å for 'hellig græns' mel a å æ. Hans anne handling vå å ansætte Luther som domkirkehund. Hans tredje vå en kaffeboe i Haasle Domkirk mæ 100 slaus kach. Der vå kø tæ Vojens."
      ],
      slut: "Å det æ æ præst fra Tingle. Biskop, synnejysk salmeboch, en sankt bernhard ve æ alter å en Puch Maxi. Gud hæ humor, saje han sjel."
    },
    julemand: {
      navne: ["julemand", "julemanden", "æ julemand", "julemand fra løjt", "julemanden fra løjt", "nissen", "julemanden på løjt"],
      intro: "Å så æ der æ julemand fra Løjt.",
      fakta: { alder: "Æ julemand fra Løjt heeje egentlig Poul, æ 73 å hæ væt julemand ve ålle juletræsfester å Løjt Land siden 1979. Han hæ sit eget skæg.", job: "Poul vå fisker i Affenraa, nå æ han julemand å fuld tid. Fra 1. novembe tæ 6. januar. Resten a åe sedde han å Løjt Kro å vente.", bil: "Han hæ en rød Lada mæ kaneslæde-mærkat å. Den starte kun i decembe." },
      kapitler: [
        "Æ julemand fra Løjt hæ fån at vee, at der æ en anne julemand i Genner. En ung jen, 40 åe, mæ falsk skæg. Poul hæ køet nee tæ Genner i æ Lada for å se å ham. Han sto ue foran forsamlingshuset i en time å kigget. Så køe han jem. Han soj it nau. Det æ værre.",
        "Nå hæ Poul meldt sæ tæ ringrien i Løjt som julemand. I juli. Mæ fuld kostume. Han rej å en pony, der heeje Rudolf. Han tow 3 ringe. Folk klappet som gale. Æ julemand fra Genner vå ås dæ. Han tow 0. Poul smilet for føest gang siden 1979.",
        "Æ julemand fra Løjt hæ fån et brev fra Rovaniemi i Finland. De vil ha ham tæ å komme å væe 'gæstejulemand' i decembe. Poul hæ svaret, at han it ka, for han ska tæ Løjt Kirkeby Skoles juletræsfest den 14. Det hæ han væt i 46 åe. Finland må vent.",
        "Poul mistet æ ene ben i decembe. It i en ulykke, men i æ Lada. Æ ben vå a træ, det hæ det væt siden 1988, da han fek det i klemme i et fiskenet ue å æ fjoe. Han glemt det i æ Lada ætte juletræsfesten i Barsmark. Æ Lada blew stjålet. Poul hæ nå et ben å en julemandsdragt å æ kro.",
        "Æ Lada blew fundet i Flensborre mæ Pouls træben å æ bagsæde. Æ tyv haj ladt det ligge. Æ politi i Flensborg ringet tæ Løjt Kro, å Poul køe nee mæ Kesse i æ traktor for å hent det. Han kom jem mæ æ ben, æ Lada å 12 kasser øl, for nå vå han dæ alichevel.",
        "Nå hæ Poul fån et nyt ben. Et moderne jet mæ fjeder i, fra sygehuset i Affenraa. Han ka hoppe. Tæ juletræsfesten i Løjt Kirkeby hoppet han om æ træ mæ æ bøen. 46 åe som julemand, å nå ka han ås hop. Æ bøen tøs, han æ æ richte julemand. Det hæ han åltins væt.",
        "Æ julemand fra Genner hæ sagt op. Han hæ gin sit falsk skæg tæ Poul som en gave. Poul hæ hængt det op å Løjt Kro ve siden a æ gammel træben. Nå æ der to ting å æ væg, der fortælle Pouls historie. Å en Lada ue foran, der starte, for det æ decembe."
      ],
      slut: "Å det æ æ julemand fra Løjt. Poul. Et fjederben, et ægte skæg, et falsk skæg å en Lada. Glædelig juel, heel åe rundt."
    },
    tykmaelk: {
      navne: ["tykmælk", "tykmælk junior", "tykmælk jr", "junior", "vestergade", "ham fra vestergade", "tykmælken"],
      intro: "Det æ lich som mæ Tykmælk Junior fra Vestergade.",
      fakta: { alder: "Tykmælk Junior æ 34 å heeje egentlig Kenneth. Hans fae vå Tykmælk Senior, så det blew sårn. Ingen ve, hvofor æ fae hed Tykmælk. Æ fae ve det heller it.", job: "Han æ mekaniker ve et værksted i Vestergade i Affenraa, å han ka få ålt tæ å køe. Ås ting, der it sku køe.", bil: "Han hæ syw biele. Jen virke. Æ anne seks æ 'projekter'. Hans kjærest hæ laut en liste." },
      kapitler: [
        "Tykmælk Junior fra Vestergade hæ bygget en elbil sjel. A en gammel Opel Kadett å 40 bore-batterier. Den køe 11 kilometer å en opladning. Lich nok tæ Røekro å tebach, hvis han it bruge æ lygter.",
        "Nå hæ Tykmælk Junior laut en ringrierhest a en knallert. Mæ et hestehoej a skum å en hale a et gammelt gardin. Han hæ meldt sæ tæ ringrien i Affenraa. Æ ringrierkomité holl møde. De ka it finne en regel imod det.",
        "Tykmælk Junior rej ringrien å æ knallerthest. Han tow 19 ringe å blew nummer to. Æ komité hæ nå laut en regel. Den træde i kraft næest åe. Tykmælk hæ ollrej tegnet en ny hest. Mæ to motorer.",
        "Tykmælk Junior hæ fån et job: han ska holl Gunnars robotplæneklipper i Røekro i live. Den æ begyndt å køe tæ Tyskland om natten. Tykmælk hæ fundet u, at Kesse hæ programmeret den. Han saje det it tæ Gunnar. Han tajer ba' betaling fra begge.",
        "Nå hæ Tykmælk Junior bygget Synnejyllands føest flyvend kritbar. En trillebør mæ en dronemotor. Den ka løfte 20 kilo kach. Moster Erna fra Bodum hæ bestilt den tæ leveringer. Tykmælk hæ it fløjet den enno. Han vente å, at Erna it kigge.",
        "Æ flyvend kritbar fløj. 300 meter øwer Bodum mæ 14 slaus kach, så sat æ batteri u, å den landet i æ præsts have i Tingle. Luther, æ sankt bernhard, spist ålt. Æ præst soj, det vå et tegn. Erna soj, det vå en regning. Tykmælk bygge en ny mæ to batterier.",
        "Tykmælk Junior æ blewn kontaktet a Danfoss. De vil ha ham ansat i udvikling. Han soj naj. Han hæ syw biele å en kjærest mæ en liste. Men han hæ soj ja tæ å reparere Mads Clausens gammel traktor å museet i Nordborg. Den køe nå. Baglæns, men den køe."
      ],
      slut: "Å det æ Tykmælk Junior fra Vestergade. Kenneth. Syw biele, en flyvend kritbar å en knallerthest. Synnejylland hæ sin egen opfinder, å han boe i Vestergade."
    }
  }
};

if (typeof module !== "undefined") module.exports = window.VIDEN;
