import { Phrase, CountryInfo } from '../types';

export const countries: CountryInfo[] = [
  {
    id: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    accent: 'Rioplatense',
    slangExample: '¿Qué onda, che? ¿Todo piola?',
    description: 'Famoso pelo uso do "vos" (voseo), entonação cantada e gírias como "che", "boludo" e "bondi".',
    defaultCharacter: 'Santi',
    voiceName: 'Microsoft Heriberto Online (Natural) - Spanish (Argentina)'
  },
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
    id: 'chile',
    name: 'Chile',
    flag: '🇨🇱',
    accent: 'Chileno',
    slangExample: '¿Cómo estai, po? ¿Cachai o no?',
    description: 'Um sotaque super rápido e único, famoso pela terminação "ai/ei" nos verbos e gírias icônicas como "cachai" e "po".',
    defaultCharacter: 'Cami',
    voiceName: 'Microsoft Lorenzo Online (Natural) - Spanish (Chile)'
  },
  {
    id: 'peru',
    name: 'Peru',
    flag: '🇵🇪',
    accent: 'Litorâneo / Limeño',
    slangExample: '¿Habla causa? Vamos por uma chela.',
    description: 'Sotaque claro e rítmico, com gírias coloridas do cotidiano limenho como "pata", "causa" e "asado".',
    defaultCharacter: 'Renzo',
    voiceName: 'Microsoft Alex Online (Natural) - Spanish (Peru)'
  }
];

export const phrases: Phrase[] = [
  // Argentina
  {
    id: 'arg_1',
    category: 'Cumprimentos',
    spanish: '¿Qué onda, che? ¿Cómo andás?',
    translation: 'E aí, cara? Como você está?',
    country: 'argentina',
    explanation: '"Che" é a palavra argentina mais famosa, serve para chamar alguém (como "cara" ou "mano"). "Andás" usa a conjugação do "vos" argentino para o verbo andar.',
    difficulty: 'fácil'
  },
  {
    id: 'arg_2',
    category: 'No Dia a Dia',
    spanish: 'Che, ¿me hacés la gamba para ir a comprar?',
    translation: 'Cara, você me quebra o galho de ir comprar?',
    country: 'argentina',
    explanation: '"Hacer la gamba" significa quebrar um galho, acompanhar ou ajudar alguém em alguma tarefa.',
    difficulty: 'fácil'
  },
  {
    id: 'arg_3',
    category: 'Na Rua',
    spanish: 'Tenemos que tomarnos el bondi acá a la vuelta.',
    translation: 'Temos que pegar o ônibus aqui na volta.',
    country: 'argentina',
    explanation: '"Bondi" é a palavra que os argentinos usam exclusivamente para ônibus de transporte público.',
    difficulty: 'fácil'
  },
  {
    id: 'arg_4',
    category: 'Restaurante',
    spanish: 'Che, mozo, ¿me traés otra Quilmes, porfa?',
    translation: 'Cara, garçom, me traz outra cerveja Quilmes, por favor?',
    country: 'argentina',
    explanation: '"Mozo" é a forma comum de chamar o garçom. "Quilmes" é a cerveja argentina mais clássica. O "traés" vem da conjugação típica do "vos" argentino (traer -> traés).',
    difficulty: 'fácil'
  },
  {
    id: 'arg_5',
    category: 'Expressões',
    spanish: '¡La verdad que estuvo re piola la juntada!',
    translation: 'A verdade é que o encontro foi super legal!',
    country: 'argentina',
    explanation: '"Re" é o prefixo intensificador argentino (re legal, re lindo = muito legal, muito lindo). "Piola" é algo legal, bom. E "juntada" é um encontro de amigos.',
    difficulty: 'médio'
  },

  // Colômbia
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

  // Chile
  {
    id: 'chi_1',
    category: 'Cumprimentos',
    spanish: '¿Cómo estai, po? ¿Todo bien?',
    translation: 'Como você está? Tudo bem?',
    country: 'chile',
    explanation: '"Estai" é a forma conjugada chilena informal (voseo chileno). O "po" é uma muleta linguística herdada de "pues", usada no fim de quase toda frase para dar ênfase.',
    difficulty: 'fácil'
  },
  {
    id: 'chi_2',
    category: 'No Dia a Dia',
    spanish: '¿Cachai lo que te estoy diciendo?',
    translation: 'Você saca/entende o que estou te dizendo?',
    country: 'chile',
    explanation: 'O verbo "cachar" (sacar, entender) é a gíria mais usada no Chile. "¿Cachai?" é o nosso famoso "entendeu?", "sacou?"',
    difficulty: 'fácil'
  },
  {
    id: 'chi_3',
    category: 'Na Rua',
    spanish: 'Voy al tiro para allá, espérame.',
    translation: 'Vou correndo/imediatamente para lá, me espera.',
    country: 'chile',
    explanation: '"Al tiro" é uma expressão chilena que significa "imediatamente", "agora mesmo", "super rápido".',
    difficulty: 'fácil'
  },
  {
    id: 'chi_4',
    category: 'Expressões',
    spanish: 'La fiesta estuvo muy fome, me fui temprano.',
    translation: 'A festa estava muito chata, fui embora cedo.',
    country: 'chile',
    explanation: '"Fome" significa sem graça, chato ou entediante. É uma gíria essencial no Chile.',
    difficulty: 'fácil'
  },
  {
    id: 'chi_5',
    category: 'No Dia a Dia',
    spanish: 'Ese chiquillo es muy buena onda, me cayó la raja.',
    translation: 'Aquele garoto é muito gente boa, gostei demais dele.',
    country: 'chile',
    explanation: '"Chiquillo" é menino/garoto. "Buena onda" é gente boa. E "caer la raja" é uma expressão chilena informal para dizer que alguém te agradou muitíssimo.',
    difficulty: 'médio'
  },

  // Peru
  {
    id: 'per_1',
    category: 'Cumprimentos',
    spanish: '¿Qué tal, causa? ¿Cómo te va?',
    translation: 'E aí, parça/amigo? Como vai você?',
    country: 'peru',
    explanation: '"Causa" é o termo limenho super popular para se referir a um amigo íntimo, equivalente a "mano" ou "parça".',
    difficulty: 'fácil'
  },
  {
    id: 'per_2',
    category: 'Restaurante',
    spanish: 'Vamos a comer un cebichito con su buena chela.',
    translation: 'Vamos comer um ceviche com uma boa cerveja gelada.',
    country: 'peru',
    explanation: '"Chela" é a palavra coloquial peruana (e de outros países andinos) para cerveja. "Cebichito" demonstra o amor do peruano por usar diminutivos em comidas.',
    difficulty: 'fácil'
  },
  {
    id: 'per_3',
    category: 'No Dia a Dia',
    spanish: '¿Me prestas diez lucas para el pasaje?',
    translation: 'Me empresta dez contos/dinheiros para a passagem?',
    country: 'peru',
    explanation: '"Lucas" é a gíria peruana para a moeda local (Soles). "Diez lucas" significa 10 Soles.',
    difficulty: 'fácil'
  },
  {
    id: 'per_4',
    category: 'Expressões',
    spanish: '¡Esa flaca baila muy paja!',
    translation: 'Aquela garota dança muito bem/muito legal!',
    country: 'peru',
    explanation: '"Flaca" (ou flaco) refere-se a namorada ou simplesmente uma garota/garoto. "Paja" no Peru significa excelente, legal ou muito bom.',
    difficulty: 'fácil'
  },
  {
    id: 'per_5',
    category: 'No Dia a Dia',
    spanish: 'Ya me voy a mi jato, estoy recontra asado.',
    translation: 'Já vou para a minha casa, estou super irritado/bravo.',
    country: 'peru',
    explanation: '"Jato" é a gíria para casa. "Asado" significa bravo, irritado ou de saco cheio. "Recontra" é o superlativo limenho (muito mesmo).',
    difficulty: 'médio'
  }
];
