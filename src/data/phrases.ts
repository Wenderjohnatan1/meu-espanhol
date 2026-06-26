import { Phrase, CountryInfo } from '../types';

export const countries: CountryInfo[] = [
  {
    id: 'colombia',
    name: 'Colômbia',
    flag: '🇨🇴',
    accent: 'Andino / Paisa',
    slangExample: '¡Hola parce! ¿Qué más? ¿Todo bien?',
    description: 'Conhecido por ser musical, amigável e usar expressões acolhedoras como "parce", "chévere" e "bacano", liderado pela jovem e simpática Valentina.',
    defaultCharacter: 'Valentina',
    voiceName: 'Microsoft Maria Online (Natural) - Spanish (Colombia)'
  },
  {
    id: 'mexico',
    name: 'México',
    flag: '🇲🇽',
    accent: 'Mexicano / Chilango',
    slangExample: '¡Qué onda, güey! ¿Todo chido o qué?',
    description: 'Um espanhol vibrante, carismático e expressivo, famoso pelo uso de gírias marcantes como "carnal", "chido", "güey" e "la neta", liderado pela jovem e alegre Ximena.',
    defaultCharacter: 'Ximena',
    voiceName: 'Microsoft Sabina Online (Natural) - Spanish (Mexico)'
  }
];

export const phrases: Phrase[] = [
  // Colômbia (52 phrases)
  {
    id: 'col_1',
    category: 'Cumprimentos',
    spanish: '¿Qué más, parce? ¿Cómo va todo?',
    translation: 'E aí, parceiro? Como vão as coisas?',
    country: 'colombia',
    explanation: '"Parce" ou "parcero" é o "brother", "mano" ou "parceiro" na Colômbia. "¿Qué más?" é uma forma super comum de perguntar "como vai?"',
    difficulty: 'fácil'
  },
  {
    id: 'col_2',
    category: 'No Dia a Dia',
    spanish: '¡Esa película estuvo muy bacana!',
    translation: 'Esse filme foi muito legal!',
    country: 'colombia',
    explanation: '"Bacano" ou "bacana" significa excelente, legal ou de boa qualidade na Colômbia.',
    difficulty: 'fácil'
  },
  {
    id: 'col_3',
    category: 'Restaurante',
    spanish: 'Me regala un tinto bien cargado, por favor.',
    translation: 'Me vê um café preto bem forte, por favor.',
    country: 'colombia',
    explanation: 'Na Colômbia, "regalar" é usado educadamente para pedir algo comprado (como "me vê/me dá"). E "tinto" é o cafezinho preto simples, sem leite.',
    difficulty: 'fácil'
  },
  {
    id: 'col_4',
    category: 'Expressões',
    spanish: '¡Qué chévere es la comida de acá!',
    translation: 'Que legal é a comida daqui!',
    country: 'colombia',
    explanation: '"Chévere" é uma gíria sul-americana icônica, muito forte na Colômbia, que significa "legal", "fantástico" ou "maravilhoso".',
    difficulty: 'fácil'
  },
  {
    id: 'col_5',
    category: 'No Dia a Dia',
    spanish: 'No te preocupes por esa vaina, ya se soluciona.',
    translation: 'Não se preocupe com essa coisa, já vai se resolver.',
    country: 'colombia',
    explanation: '"Vaina" é uma palavra coringa na Colômbia (e norte da América do Sul) para se referir a qualquer "coisa", "assunto" ou "objeto".',
    difficulty: 'médio'
  },
  {
    id: 'col_6',
    category: 'Expressões',
    spanish: '¡Qué chimba de lugar, parce! Me encanta.',
    translation: 'Que lugar foda, parceiro! Adoro.',
    country: 'colombia',
    explanation: '"Una chimba" é a gíria colombiana definitiva para expressar que algo é extremamente bom, excelente ou espetacular.',
    difficulty: 'fácil'
  },
  {
    id: 'col_7',
    category: 'No Dia a Dia',
    spanish: '¡Qué mamera tener que trabajar hoy!',
    translation: 'Que preguiça/tédio ter que trabalhar hoje!',
    country: 'colombia',
    explanation: '"Mamera" expressa uma sensação de tédio, cansaço mental, preguiça profunda ou chatice em relação a algo.',
    difficulty: 'fácil'
  },
  {
    id: 'col_8',
    category: 'Cumprimentos',
    spanish: '¡No me digas más, parcero! Nos vemos allá.',
    translation: 'Não me diga mais, parceiro! Nos vemos lá.',
    country: 'colombia',
    explanation: 'Expressão de conformidade calorosa que significa "combinado" ou "nem precisa falar mais nada, estou dentro".',
    difficulty: 'fácil'
  },
  {
    id: 'col_9',
    category: 'Expressões',
    spanish: 'Voy a la tienda por unas polas bien frías.',
    translation: 'Vou à loja buscar umas cervejas bem geladas.',
    country: 'colombia',
    explanation: '"Pola" é a gíria colombiana clássica e indiscutível para cerveja.',
    difficulty: 'fácil'
  },
  {
    id: 'col_10',
    category: 'No Dia a Dia',
    spanish: 'Ese man de la esquina es una nota completa.',
    translation: 'Aquele cara da esquina é gente boa demais.',
    country: 'colombia',
    explanation: '"Man" significa cara/sujeito. "Ser una nota" significa ser uma pessoa muito legal, engraçada ou de excelente caráter.',
    difficulty: 'fácil'
  },
  {
    id: 'col_11',
    category: 'Expressões',
    spanish: 'Listo, de una. Hágale pues.',
    translation: 'Pronto, combinado. Vai em frente / Manda bala.',
    country: 'colombia',
    explanation: '"Hágale pues" é um incentivo ou consentimento tipicamente de Medellín (paisa) que equivale a "manda bala" ou "vamos a isso".',
    difficulty: 'fácil'
  },
  {
    id: 'col_12',
    category: 'No Dia a Dia',
    spanish: '¿Tiene cambio de cincuenta mil, por favor?',
    translation: 'Tem troco para cinquenta mil, por favor?',
    country: 'colombia',
    explanation: 'Útil no comércio local colombiano. "Cambio" significa troco.',
    difficulty: 'fácil'
  },
  {
    id: 'col_13',
    category: 'Expressões',
    spanish: '¡Uy, hermano, tengo un guayabo tremendo!',
    translation: 'Nossa, irmão, estou com uma ressaca tremenda!',
    country: 'colombia',
    explanation: '"Guayabo" é o termo exclusivo na Colômbia para ressaca alcoólica.',
    difficulty: 'fácil'
  },
  {
    id: 'col_14',
    category: 'Expressões',
    spanish: 'Ese comercial de televisión es una boleta.',
    translation: 'Aquele comercial de TV é um mico/vergonha alheia.',
    country: 'colombia',
    explanation: '"Boleta" ou "ser una boleta" refere-se a algo cafona, ridículo ou que dá muita vergonha alheia.',
    difficulty: 'médio'
  },
  {
    id: 'col_15',
    category: 'No Dia a Dia',
    spanish: 'Pilas con la maleta en esa calle.',
    translation: 'Fique esperto com a mala nessa rua.',
    country: 'colombia',
    explanation: '"Pilas" significa estar atento, focado ou ter cuidado extremo ("fica esperto").',
    difficulty: 'fácil'
  },
  {
    id: 'col_16',
    category: 'Restaurante',
    spanish: 'Esa arepa con queso está muy rica, de buena.',
    translation: 'Essa arepa com queijo está deliciosa, de verdade.',
    country: 'colombia',
    explanation: '"De buena" é uma expressão para jurar ou enfatizar que algo é real ("de verdade", "sem mentira").',
    difficulty: 'fácil'
  },
  {
    id: 'col_17',
    category: 'Balada / Rumba',
    spanish: 'Vamos a rumbear a una discoteca en Provenza.',
    translation: 'Vamos festejar em uma boate em Provenza.',
    country: 'colombia',
    explanation: '"Rumbear" é o verbo colombiano para sair de festa/balada.',
    difficulty: 'fácil'
  },
  {
    id: 'col_18',
    category: 'Expressões',
    spanish: '¡No me dé lora, que tengo mucho dolor de cabeza!',
    translation: 'Não encha meu saco, porque estou com muita dor de cabeça!',
    country: 'colombia',
    explanation: '"Dar lora" significa falar demais, dar sermão ou ficar amolando/enchendo o saco de alguém.',
    difficulty: 'médio'
  },
  {
    id: 'col_19',
    category: 'No Dia a Dia',
    spanish: 'Me quedé sin plata para el taxi, estoy limpio.',
    translation: 'Fiquei sem dinheiro para o táxi, estou zerado.',
    country: 'colombia',
    explanation: '"Plata" é dinheiro. "Estar limpio" significa estar liso, sem um tostão no bolso.',
    difficulty: 'fácil'
  },
  {
    id: 'col_20',
    category: 'No Dia a Dia',
    spanish: '¡Vea pues! No tenía idea de que eso pasaba.',
    translation: 'Olha só! Não tinha ideia de que isso acontecia.',
    country: 'colombia',
    explanation: '"¡Vea pues!" é uma exclamação paisa muito popular para expressar espanto, surpresa ou curiosidade.',
    difficulty: 'fácil'
  },
  {
    id: 'col_21',
    category: 'Expressões',
    spanish: '¡Qué berraquera de mujer! Trabaja y estudia.',
    translation: 'Que mulher incrível/batalhadora! Trabalha e estuda.',
    country: 'colombia',
    explanation: '"Berraquera" expressa garra, excelência, valentia ou algo fantástico feito com muito esforço.',
    difficulty: 'médio'
  },
  {
    id: 'col_22',
    category: 'Restaurante',
    spanish: '¿A cómo tiene las arepas de choclo hoy?',
    translation: 'Quanto custam as arepas de choclo (milho doce) hoje?',
    country: 'colombia',
    explanation: '"¿A cómo tiene...?" é a pergunta clássica no comércio informal para saber o preço unitário.',
    difficulty: 'fácil'
  },
  {
    id: 'col_23',
    category: 'No Dia a Dia',
    spanish: 'Nos vemos en el parque para echar rulo.',
    translation: 'Nos vemos no parque para fofocar/bater papo.',
    country: 'colombia',
    explanation: '"Echar rulo" significa fofocar alegremente com amigos ou colocar o papo em dia.',
    difficulty: 'médio'
  },
  {
    id: 'col_24',
    category: 'No Dia a Dia',
    spanish: 'Me cayó gordo ese tipo del almacén.',
    translation: 'Não fui com a cara daquele cara da loja.',
    country: 'colombia',
    explanation: '"Caer gordo" significa não simpatizar com alguém, achar a pessoa desagradável de cara.',
    difficulty: 'fácil'
  },
  {
    id: 'col_25',
    category: 'Expressões',
    spanish: '¡Qué charro ese chiste que contaste!',
    translation: 'Que engraçada essa piada que você contou!',
    country: 'colombia',
    explanation: 'No dialeto paisa (região de Medellín), "charro" significa engraçado ou divertido (em outros países pode significar grosseiro).',
    difficulty: 'médio'
  },
  {
    id: 'col_26',
    category: 'Expressões',
    spanish: 'Hágale, parcerito, nos vemos en la jugada.',
    translation: 'Beleza, parceirinho, nos vemos na atividade.',
    country: 'colombia',
    explanation: '"Estar en la jugada" significa estar atento, esperto ou no circuito pronto para agir.',
    difficulty: 'médio'
  },
  {
    id: 'col_27',
    category: 'Restaurante',
    spanish: '¡Tengo un filo tenaz! Vamos a almorzar ya.',
    translation: 'Estou com uma fome violenta! Vamos almoçar logo.',
    country: 'colombia',
    explanation: '"Tener filo" significa literalmente estar com muita fome.',
    difficulty: 'fácil'
  },
  {
    id: 'col_28',
    category: 'No Dia a Dia',
    spanish: 'Comprar ese celular me costó un ojo de la cara.',
    translation: 'Comprar esse celular me custou os olhos da cara.',
    country: 'colombia',
    explanation: 'Expressão idiomática idêntica ao português para coisas extremamente caras.',
    difficulty: 'fácil'
  },
  {
    id: 'col_29',
    category: 'Expressões',
    spanish: 'Siga, bien pueda, siéntese en la sala.',
    translation: 'Entre, sinta-se em casa, sente-se na sala.',
    country: 'colombia',
    explanation: '"Bien pueda" é o clássico colombiano ultra cordial para dar passagem ou permissão ("fique à vontade").',
    difficulty: 'fácil'
  },
  {
    id: 'col_30',
    category: 'Expressões',
    spanish: '¡Qué visaje en esa esquina, mejor vámonos!',
    translation: 'Que perigo/estranheza naquela esquina, melhor irmos embora!',
    country: 'colombia',
    explanation: '"Dar visaje" ou "qué visaje" refere-se a atitudes suspeitas, perigosas ou chamativas que dão desconfiança na rua.',
    difficulty: 'médio'
  },
  {
    id: 'col_31',
    category: 'No Dia a Dia',
    spanish: '¿Me puede colaborar con una moneda, de buena?',
    translation: 'Pode me ajudar com uma moeda, de verdade?',
    country: 'colombia',
    explanation: '"Colaborar" é o verbo polido e comumente usado na rua para pedir assistência ou ajuda financeira.',
    difficulty: 'fácil'
  },
  {
    id: 'col_32',
    category: 'Balada / Rumba',
    spanish: 'Esa fiesta en Cali estuvo de ataque.',
    translation: 'Aquela festa em Cali foi espetacular/incrível.',
    country: 'colombia',
    explanation: '"Estar de ataque" significa estar excelente, digno de aplausos, insuperável.',
    difficulty: 'médio'
  },
  {
    id: 'col_33',
    category: 'Expressões',
    spanish: '¡Qué oso lo que me pasó ayer con el jefe!',
    translation: 'Que mico o que me aconteceu ontem com o chefe!',
    country: 'colombia',
    explanation: '"Qué oso" é o equivalente a "que mico", "que vergonha" em vários países, incluindo Colômbia.',
    difficulty: 'fácil'
  },
  {
    id: 'col_34',
    category: 'Restaurante',
    spanish: 'Hagamos una vaca para comprar la gaseosa.',
    translation: 'Vamos fazer uma vaquinha para comprar o refrigerante.',
    country: 'colombia',
    explanation: '"Hacer una vaca" significa fazer vaquinha, ratear despesas entre amigos.',
    difficulty: 'fácil'
  },
  {
    id: 'col_35',
    category: 'Transporte / Táxi',
    spanish: 'El taxista me dio una vuelta re larga.',
    translation: 'O taxista me deu uma volta super longa.',
    country: 'colombia',
    explanation: '"Re larga" usa o prefixo "re" (intensificador) muito comum em Medellín e Bogotá para indicar tamanho ou intensidade.',
    difficulty: 'fácil'
  },
  {
    id: 'col_36',
    category: 'Balada / Rumba',
    spanish: 'Vamos a tirar paso a Juanchito este sábado.',
    translation: 'Vamos dançar em Juanchito (zona de salsa em Cali) este sábado.',
    country: 'colombia',
    explanation: '"Tirar paso" significa dançar, sacudir o corpo na pista de dança.',
    difficulty: 'médio'
  },
  {
    id: 'col_37',
    category: 'No Dia a Dia',
    spanish: '¿Dónde puedo cambiar dólares por acá cerca?',
    translation: 'Onde posso trocar dólares por aqui perto?',
    country: 'colombia',
    explanation: 'Frase essencial para turismo. "Por acá" significa por aqui.',
    difficulty: 'fácil'
  },
  {
    id: 'col_38',
    category: 'No Dia a Dia',
    spanish: '¡Qué pena molestarle, pero me da la hora?',
    translation: 'Desculpe incomodá-lo, mas me diz as horas?',
    country: 'colombia',
    explanation: '"Qué pena" é a introdução educada número um na Colômbia antes de qualquer pergunta na rua.',
    difficulty: 'fácil'
  },
  {
    id: 'col_39',
    category: 'No Dia a Dia',
    spanish: 'La pasamos re bien en el paseo de olla.',
    translation: 'Nos divertimos muito no piquenique de domingo.',
    country: 'colombia',
    explanation: '"Paseo de olla" é a tradicional viagem de domingo das famílias colombianas para rios, cozinhando de panela na margem.',
    difficulty: 'médio'
  },
  {
    id: 'col_40',
    category: 'No Dia a Dia',
    spanish: 'Tengo este trámite de visa muy embolatado.',
    translation: 'Tenho este processo de visto muito confuso/complicado.',
    country: 'colombia',
    explanation: '"Embolatado" descreve algo que está confuso, enrolado, bagunçado ou atrasado.',
    difficulty: 'médio'
  },
  {
    id: 'col_41',
    category: 'Transporte / Táxi',
    spanish: 'Voy de afán, ojalá que el metro no se demore.',
    translation: 'Estou com pressa, tomara que o metrô não demore.',
    country: 'colombia',
    explanation: '"Ir de afán" significa ir com pressa, apressado.',
    difficulty: 'fácil'
  },
  {
    id: 'col_42',
    category: 'Transporte / Táxi',
    spanish: '¿A qué horas abre la taquilla del bus?',
    translation: 'A que horas abre a bilheteria do ônibus?',
    country: 'colombia',
    explanation: '"Taquilla" é o guichê ou bilheteria oficial.',
    difficulty: 'fácil'
  },
  {
    id: 'col_43',
    category: 'No Dia a Dia',
    spanish: '¡Qué gentío hay en el Mercado de Bazurto!',
    translation: 'Quanta gente tem no Mercado de Bazurto (Cartagena)!',
    country: 'colombia',
    explanation: '"Gentío" significa multidão, excesso de pessoas em um único espaço.',
    difficulty: 'fácil'
  },
  {
    id: 'col_44',
    category: 'Restaurante',
    spanish: '¿Me regala la cuenta con el servicio, porfa?',
    translation: 'Me vê a conta com o serviço (gorjeta), por favor?',
    country: 'colombia',
    explanation: 'Gorjeta é opcional mas bem-vinda, chamada de "servicio".',
    difficulty: 'fácil'
  },
  {
    id: 'col_45',
    category: 'No Dia a Dia',
    spanish: '¡Uf, qué calorazo está haciendo en Cartagena!',
    translation: 'Nossa, que calorão está fazendo em Cartagena!',
    country: 'colombia',
    explanation: '"Calorazo" é o aumentativo perfeito para dias ensolarados na costa.',
    difficulty: 'fácil'
  },
  {
    id: 'col_46',
    category: 'Expressões',
    spanish: 'Echemos carreta un rato antes de salir.',
    translation: 'Vamos bater papo furado um pouco antes de sair.',
    country: 'colombia',
    explanation: '"Echar carreta" significa conversar, tagarelar fiado ou contar piadas e causos com amigos.',
    difficulty: 'médio'
  },
  {
    id: 'col_47',
    category: 'Expressões',
    spanish: 'No se deje engañar, ese vendedor es muy abeja.',
    translation: 'Não se deixe enganar, aquele vendedor é muito esperto/malandro.',
    country: 'colombia',
    explanation: '"Ser abeja" significa ser esperto, sagaz, ligeiro para tirar proveito positivo ou negativo de algo.',
    difficulty: 'médio'
  },
  {
    id: 'col_48',
    category: 'No Dia a Dia',
    spanish: 'Tengo que madrugar mucho para tomar el vuelo.',
    translation: 'Tenho que madrugar muito para pegar o voo.',
    country: 'colombia',
    explanation: '"Madrugar" é amplamente usado como verbo ativo para acordar cedinho.',
    difficulty: 'fácil'
  },
  {
    id: 'col_49',
    category: 'No Dia a Dia',
    spanish: 'El hotel del centro es re chusco y barato.',
    translation: 'O hotel do centro é super bonitinho e barato.',
    country: 'colombia',
    explanation: '"Chusco" significa bonito, elegante, simpático ou bem ajeitado.',
    difficulty: 'médio'
  },
  {
    id: 'col_50',
    category: 'Expressões',
    spanish: '¡Listo, mi hermano, quedamos firmes así!',
    translation: 'Beleza, meu irmão, combinados assim!',
    country: 'colombia',
    explanation: '"Quedar firme" ou "estar firme" na gíria urbana significa combinado, fechado de forma sólida.',
    difficulty: 'fácil'
  },
  {
    id: 'col_51',
    category: 'Expressões',
    spanish: 'Le dio una pálida de tanto subir escaleras.',
    translation: 'Ele teve um treco / passou mal de tanto subir escadas.',
    country: 'colombia',
    explanation: '"Dar una pálida" significa sofrer uma queda de pressão repentina, passar mal ou empalidecer.',
    difficulty: 'médio'
  },
  {
    id: 'col_52',
    category: 'Transporte / Táxi',
    spanish: '¿Dónde queda el paradero del bus intermunicipal?',
    translation: 'Onde fica o ponto de ônibus intermunicipal?',
    country: 'colombia',
    explanation: '"Paradero" refere-se especificamente ao ponto de parada regulamentado na rua.',
    difficulty: 'fácil'
  },

  // México (52 phrases)
  {
    id: 'mex_1',
    category: 'Cumprimentos',
    spanish: '¿Qué onda, güey? ¿Cómo andas?',
    translation: 'E aí, cara? Como você tá?',
    country: 'mexico',
    explanation: '"Güey" é o termo mexicano número um, equivalente a cara, mano ou brother. "¿Qué onda?" é o cumprimento universal deles.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_2',
    category: 'No Dia a Dia',
    spanish: '¡Está bien chido este parque!',
    translation: 'Está muito legal este parque!',
    country: 'mexico',
    explanation: '"Chido" significa legal, bacana ou bom. É a gíria mexicana mais conhecida internacionalmente.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_3',
    category: 'Expressões',
    spanish: '¡No mames, ¿es en serio que cancelaron?!',
    translation: 'Caralho/Não brinca, é sério que cancelaram?!',
    country: 'mexico',
    explanation: '"No mames" expressa descrença profunda, surpresa extrema ou choque. Atenção: é altamente informal e gíria de rua (evite em ambientes formais).',
    difficulty: 'fácil'
  },
  {
    id: 'mex_4',
    category: 'Restaurante',
    spanish: 'Me da tres tacos al pastor con todo, por fa.',
    translation: 'Me dá três tacos ao pastor completos, por favor.',
    country: 'mexico',
    explanation: '"Tacos al pastor" são feitos com porco grelhado em espeto giratório. "Con todo" significa com cebola, coentro e abacaxi.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_5',
    category: 'No Dia a Dia',
    spanish: '¡Qué chida playera traes puesta!',
    translation: 'Que camiseta legal você está vestindo!',
    country: 'mexico',
    explanation: '"Playera" é a denominação mexicana exclusiva para camiseta ou t-shirt.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_6',
    category: 'No Dia a Dia',
    spanish: '¡A poco no sabías que él era actor!',
    translation: 'Não me diga que você não sabia que ele era ator!',
    country: 'mexico',
    explanation: '"¿A poco?" é uma locução mexicana fantástica que significa "Sério?", "Não brinca!" ou "Por acaso...".',
    difficulty: 'médio'
  },
  {
    id: 'mex_7',
    category: 'Expressões',
    spanish: '¡Ya estás, carnal! Nos vemos al rato.',
    translation: 'Fechado, meu irmão! Nos vemos daqui a pouco.',
    country: 'mexico',
    explanation: '"Carnal" significa irmão de consideração ou amigo do peito. "Ya estás" é uma aceitação de trato ("fechado").',
    difficulty: 'fácil'
  },
  {
    id: 'mex_8',
    category: 'Restaurante',
    spanish: 'No te preocupes por la cuenta, yo disparo.',
    translation: 'Não se preocupe com a conta, eu pago/eu patrocino.',
    country: 'mexico',
    explanation: '"Disparar" no México significa pagar a conta para os outros de forma cortês e voluntária.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_9',
    category: 'Expressões',
    spanish: '¡Qué padre estuvo el festival de música!',
    translation: 'Que legal foi o festival de música!',
    country: 'mexico',
    explanation: '"Padre" no México vai muito além do pai de família ou sacerdote. Significa que algo é ótimo, fantástico ou formidável.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_10',
    category: 'Restaurante',
    spanish: 'Ten cuidado con esa salsa que pica un buen.',
    translation: 'Cuidado com esse molho que arde bastante.',
    country: 'mexico',
    explanation: '"Picar" é o verbo usado para indicar ardência de pimenta. "Un buen" significa "muito" ou "bastante".',
    difficulty: 'fácil'
  },
  {
    id: 'mex_11',
    category: 'No Dia a Dia',
    spanish: '¿Tiene feria de quinientos pesos, joven?',
    translation: 'Tem troco para quinhentos pesos, moço?',
    country: 'mexico',
    explanation: '"Feria" no México significa troco em moedas ou notas de menor valor. "Joven" é usado educadamente para chamar atendentes.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_12',
    category: 'Restaurante',
    spanish: 'Me da una chela bien muerta, por favor.',
    translation: 'Me vê uma cerveja extremamente gelada, por favor.',
    country: 'mexico',
    explanation: '"Chela" é cerveja. "Bien muerta" é a hilária expressão mexicana para descrever cerveja estupidamente gelada.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_13',
    category: 'Balada / Rumba',
    spanish: '¡Ayer en el antro me la pasé de pocas madres!',
    translation: 'Ontem na balada eu me diverti pra caramba / foi bom demais!',
    country: 'mexico',
    explanation: '"Antro" é a boate/balada. "De pocas madres" significa excepcional, extraordinário ou incrível.',
    difficulty: 'médio'
  },
  {
    id: 'mex_14',
    category: 'Expressões',
    spanish: '¡Ándale pues, llámame cuando llegues!',
    translation: 'Beleza então, me liga quando chegar!',
    country: 'mexico',
    explanation: '"Ándale" é o termo coringa do México. "Ándale pues" serve para aceitar, confirmar ou apressar um acordo.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_15',
    category: 'No Dia a Dia',
    spanish: '¡Qué hueva tener que levantarme tan temprano!',
    translation: 'Que preguiça danada ter que acordar tão cedo!',
    country: 'mexico',
    explanation: '"Hueva" ou "dar hueva" significa preguiça tremenda ou algo que gera tédio supremo.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_16',
    category: 'Balada / Rumba',
    spanish: '¡Vamos a echar desmadre a la cantina!',
    translation: 'Vamos fazer bagunça/festejar pra valer no bar!',
    country: 'mexico',
    explanation: '"Desmadre" refere-se a bagunça geral, desordem alegre ou uma festa muito louca de amigos.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_17',
    category: 'Restaurante',
    spanish: '¡Híjole, se me olvidó la cartera en el hotel!',
    translation: 'Nossa/Puxa vida, esqueci a carteira no hotel!',
    country: 'mexico',
    explanation: '"¡Híjole!" é a interjeição mexicana de espanto, desgosto, surpresa desagradável ou choque ("Puxa vida!", "Caramba!").',
    difficulty: 'fácil'
  },
  {
    id: 'mex_18',
    category: 'No Dia a Dia',
    spanish: 'Este cargador de celular salió bien chafa.',
    translation: 'Este carregador de celular saiu muito vagabundo/ruim.',
    country: 'mexico',
    explanation: '"Chafa" é algo de má qualidade, pirata, que quebra fácil ou ruim.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_19',
    category: 'No Dia a Dia',
    spanish: 'Estoy bien crudo, necesito un consomé de barbacoa.',
    translation: 'Estou com uma ressaca danada, preciso de um caldo de barbacoa.',
    country: 'mexico',
    explanation: '"Estar crudo" é a expressão mexicana para ressaca. Um caldo quente (consomé) é o remédio tradicional.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_20',
    category: 'Expressões',
    spanish: '¡No manches, se canceló el partido de fútbol!',
    translation: 'Não brinca / Não acredito, o jogo de futebol foi cancelado!',
    country: 'mexico',
    explanation: '"No manches" é a versão leve, limpa e educada da gíria de choque "no mames". Pode ser usada em qualquer ambiente social.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_21',
    category: 'No Dia a Dia',
    spanish: 'Ese chavo que vende tacos es súper buena onda.',
    translation: 'Aquele garoto que vende tacos é super gente boa.',
    country: 'mexico',
    explanation: '"Chavo" (ou chava) significa jovem/garoto. "Buena onda" indica simpatia e bom caráter.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_22',
    category: 'Cumprimentos',
    spanish: '¡Qué milagro verte por acá! ¿Cómo va todo?',
    translation: 'Que milagre ver você por aqui! Como vão as coisas?',
    country: 'mexico',
    explanation: 'Cumprimento caloroso para quando você encontra alguém que não via há bastante tempo.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_23',
    category: 'No Dia a Dia',
    spanish: 'Voy de volada a comprar las tortillas.',
    translation: 'Vou correndo/rapidinho comprar as tortilhas.',
    country: 'mexico',
    explanation: '"De volada" significa fazer algo instantaneamente, voando, com velocidade extrema.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_24',
    category: 'Expressões',
    spanish: '¿A poco de veras te creíste esa mentira?',
    translation: 'Não brinca que você realmente acreditou nessa mentira?',
    country: 'mexico',
    explanation: '"De veras" significa de verdade. Enfatiza o espanto diante da ingenuidade.',
    difficulty: 'médio'
  },
  {
    id: 'mex_25',
    category: 'No Dia a Dia',
    spanish: '¡Qué chulo está tu perrito nuevo!',
    translation: 'Que lindo está o seu cachorrinho novo!',
    country: 'mexico',
    explanation: '"Chulo" significa belo, gracioso, fofo ou muito bonito.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_26',
    category: 'No Dia a Dia',
    spanish: '¿Me da chance de pasar, por favor, joven?',
    translation: 'Me dá licença para passar, por favor, moço?',
    country: 'mexico',
    explanation: '"Dar chance" é aceito no México para pedir permissão física ou oportunidade para realizar algo.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_27',
    category: 'Expressões',
    spanish: '¡Órale, qué buena idea tuviste!',
    translation: 'Uau / Que massa, que boa ideia você teve!',
    country: 'mexico',
    explanation: '"Órale" serve para aceitar com entusiasmo, comemorar ("massa!/vai lá!") ou demonstrar espanto positivo.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_28',
    category: 'Expressões',
    spanish: 'Esa chamarra de cuero que traes está padrísima.',
    translation: 'Essa jaqueta de couro que você está vestindo é legal demais.',
    country: 'mexico',
    explanation: '"Chamarra" é jaqueta. "Padrísima" é o superlativo extremo de "padre" (muito legal mesmo).',
    difficulty: 'médio'
  },
  {
    id: 'mex_29',
    category: 'No Dia a Dia',
    spanish: 'No tengo varo, me quedé bien gastado.',
    translation: 'Não tenho grana, fiquei bem sem dinheiro.',
    country: 'mexico',
    explanation: '"Varo" é a gíria popular mexicana para dinheiro físico (peso mexicano).',
    difficulty: 'fácil'
  },
  {
    id: 'mex_30',
    category: 'No Dia a Dia',
    spanish: '¡Aguas con los baches profundos de esta calle!',
    translation: 'Cuidado com os buracos profundos desta rua!',
    country: 'mexico',
    explanation: '"¡Aguas!" é o grito mexicano de alerta número um para "cuidado!" ou "fique atento!".',
    difficulty: 'fácil'
  },
  {
    id: 'mex_31',
    category: 'Restaurante',
    spanish: '¿Me cobras esto en efectivo o tarjeta, porfa?',
    translation: 'Pode cobrar isso em dinheiro ou cartão, por favor?',
    country: 'mexico',
    explanation: '"Efectivo" é a forma padrão para referir-se a dinheiro vivo.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_32',
    category: 'Expressões',
    spanish: '¡No te pases! El precio está carísimo.',
    translation: 'Não apela / Não exagera! O preço está caríssimo.',
    country: 'mexico',
    explanation: '"No te pases" é usado para dizer "não abuse", "não passe dos limites" ou "não exagere".',
    difficulty: 'fácil'
  },
  {
    id: 'mex_33',
    category: 'Expressões',
    spanish: '¡Qué oso pasé cuando se rompió mi bolsa!',
    translation: 'Que mico passei quando minha sacola rasgou!',
    country: 'mexico',
    explanation: 'Uso de "qué oso" para denotar uma situação vergonhosa ou embaraçosa.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_34',
    category: 'No Dia a Dia',
    spanish: 'Hagamos una cooperacha para comprar las botanas.',
    translation: 'Vamos fazer uma vaquinha para comprar os salgadinhos.',
    country: 'mexico',
    explanation: '"Cooperacha" é o termo informal mexicano para recolher dinheiro conjunto ("vaquinha"). "Botanas" são salgadinhos/petiscos.',
    difficulty: 'médio'
  },
  {
    id: 'mex_35',
    category: 'Transporte / Táxi',
    spanish: 'El taxi al aeropuerto me costó un ojo de la cara.',
    translation: 'O táxi ao aeroporto me custou os olhos da cara.',
    country: 'mexico',
    explanation: 'Termo comum e compreendido perfeitamente em todo o país.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_36',
    category: 'Restaurante',
    spanish: 'Disculpe, ¿dónde está el baño, de favor?',
    translation: 'Desculpe, onde fica o banheiro, por favor?',
    country: 'mexico',
    explanation: '"De favor" é uma variação muito cordial e mexicana de pedir favores cotidianos.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_37',
    category: 'Cumprimentos',
    spanish: '¿Qué transa, carnal? ¿Todo bien o qué?',
    translation: 'E aí, irmão? Tudo bem ou o quê?',
    country: 'mexico',
    explanation: '"¿Qué transa?" é uma gíria urbana de rua bastante informal para perguntar "o que há?", "como vão as coisas?".',
    difficulty: 'médio'
  },
  {
    id: 'mex_38',
    category: 'Restaurante',
    spanish: 'Me da un café de olla bien caliente, por favor.',
    translation: 'Me dá um café de olla bem quente, por favor.',
    country: 'mexico',
    explanation: '"Café de olla" é o café aromatizado com canela e adoçado com piloncillo (rapadura), cozido em jarros de barro tradicionais.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_39',
    category: 'Expressões',
    spanish: '¡Qué chido que pudiste venir a visitarnos!',
    translation: 'Que legal que você pôde vir nos visitar!',
    country: 'mexico',
    explanation: '"Qué chido que..." introduz satisfação ou aprovação sincera em relação a uma ação do interlocutor.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_40',
    category: 'No Dia a Dia',
    spanish: 'Tengo este trámite de aduana muy enredado.',
    translation: 'Tenho este processo de alfândega muito confuso/complicado.',
    country: 'mexico',
    explanation: '"Enredado" significa confuso, embaraçado ou cheio de nós burocráticos.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_41',
    category: 'Transporte / Táxi',
    spanish: 'Voy echo la mocha porque tengo mucha prisa.',
    translation: 'Estou indo super rápido porque estou com muita pressa.',
    country: 'mexico',
    explanation: '"Ir echo la mocha" é uma gíria mexicana sensacional que significa ir em velocidade máxima ou com pressa gigantesca.',
    difficulty: 'médio'
  },
  {
    id: 'mex_42',
    category: 'Transporte / Táxi',
    spanish: '¿A qué hora abre la zona arqueológica de Teotihuacán?',
    translation: 'A que horas abre a zona arqueológica de Teotihuacán?',
    country: 'mexico',
    explanation: 'Frase essencial para visitas turísticas clássicas aos arredores da capital.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_43',
    category: 'No Dia a Dia',
    spanish: '¡Qué de gente hay en el tianguis los domingos!',
    translation: 'Quanta gente tem na feira de rua aos domingos!',
    country: 'mexico',
    explanation: '"Tianguis" é o nome de origem náuatle dado exclusivamente às feiras de rua ou mercados itinerantes mexicanos.',
    difficulty: 'médio'
  },
  {
    id: 'mex_44',
    category: 'Restaurante',
    spanish: 'La cuenta con el servicio incluido, por favor, joven.',
    translation: 'A conta com o serviço incluído, por favor, moço.',
    country: 'mexico',
    explanation: 'No México, a gorjeta costuma ser de 10% a 15% e é comumente referida como "el servicio" ou "la propina".',
    difficulty: 'fácil'
  },
  {
    id: 'mex_45',
    category: 'No Dia a Dia',
    spanish: '¡Uf, hace un calorón marca diablo en Monterrey!',
    translation: 'Nossa, faz um calorão absurdo em Monterrey!',
    country: 'mexico',
    explanation: '"Calorón marca diablo" é a gíria hiperbólica mexicana para calor insuportável e extremo.',
    difficulty: 'médio'
  },
  {
    id: 'mex_46',
    category: 'No Dia a Dia',
    spanish: 'Ese chavo del hotel es bien chismoso, ¡cuidado!',
    translation: 'Aquele garoto do hotel é muito fofoqueiro, cuidado!',
    country: 'mexico',
    explanation: '"Chismoso" significa aquele que gosta de fofocas (chismes) ou de vigiar a vida alheia.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_47',
    category: 'Expressões',
    spanish: '¡Ponte trucha con tu cartera en el mercado!',
    translation: 'Fique esperto com a sua carteira no mercado!',
    country: 'mexico',
    explanation: '"Ponerse trucha" é a clássica recomendação para ficar atento, esperto, ativo ou ligado contra perigos.',
    difficulty: 'médio'
  },
  {
    id: 'mex_48',
    category: 'No Dia a Dia',
    spanish: 'Tengo que pararme muy temprano para agarrar el autobús.',
    translation: 'Tenho que levantar muito cedo para pegar o ônibus.',
    country: 'mexico',
    explanation: '"Pararse" é frequentemente usado no México para expressar levantar-se da cama pela manhã.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_49',
    category: 'No Dia a Dia',
    spanish: 'El hostal cerca del Zócalo está bien chulo y limpio.',
    translation: 'O hostel perto do Zócalo está bem bonito e limpo.',
    country: 'mexico',
    explanation: '"Zócalo" é a imensa praça de armas central da Cidade do México, coração histórico da metrópole.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_50',
    category: 'Expressões',
    spanish: '¡Ya estás, jefe! Nos vemos el lunes sin falta.',
    translation: 'Combinado, chefe! Nos vemos na segunda-feira sem falta.',
    country: 'mexico',
    explanation: '"Jefe" ou "jefa" além de pai/mãe, serve de tratamento cordial informal nas ruas para atendentes ou taxistas.',
    difficulty: 'fácil'
  },
  {
    id: 'mex_51',
    category: 'No Dia a Dia',
    spanish: 'Casi me da el patatús cuando vi la cuenta.',
    translation: 'Quase tive um treco / passei mal quando vi a conta.',
    country: 'mexico',
    explanation: '"Dar el patatús" refere-se a um desmaio simulado, susto imenso ou mal-estar cômico por surpresa.',
    difficulty: 'médio'
  },
  {
    id: 'mex_52',
    category: 'Transporte / Táxi',
    spanish: '¿Dónde se toma el metrobús para ir a Reforma?',
    translation: 'Onde se pega o metrô-ônibus para ir à Reforma?',
    country: 'mexico',
    explanation: 'O "Metrobús" é o sistema BRT articulado de transporte na avenida Paseo de la Reforma na capital.',
    difficulty: 'fácil'
  }
];
