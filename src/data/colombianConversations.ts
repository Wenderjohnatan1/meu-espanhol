import { SlangGlossaryItem } from '../types';

export interface ConversationTurn {
  id: string;
  speaker: string;
  isUserTurn: boolean;
  spanish: string;
  translation: string;
  slangTip?: string;
}

export interface ColombianConversation {
  id: string;
  title: string;
  category: 'Hotel' | 'Flerte' | 'Restaurante' | 'Táxi' | 'Balada' | 'Cotidiano';
  location: string;
  description: string;
  turns: ConversationTurn[];
  slangGlossary: SlangGlossaryItem[];
}

export const colombianConversations: ColombianConversation[] = [
  {
    id: 'col_hotel_1',
    title: '1. Registro em El Poblado',
    category: 'Hotel',
    location: 'Medellín',
    description: 'Você acaba de chegar ao hotel e fala com Valentina na recepção.',
    turns: [
      {
        id: 'h1_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas tardes! Qué más, bienvenido a Medellín. ¿Cómo me le va?',
        translation: 'Boa tarde! E aí, bem-vindo a Medellín. Como vai?',
        slangTip: '"¿Cómo me le va?" é uma forma super cortês e típica colombiana de perguntar "como vai você?".'
      },
      {
        id: 'h1_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, muy bien, gracias. Tengo una reserva a nombre de Juan.',
        translation: 'Olá, muito bem, obrigado. Tenho uma reserva em nome de Juan.',
        slangTip: 'Frase simples de check-in para iniciar a conversa.'
      },
      {
        id: 'h1_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, mi hermano. Déme un segundito que ya le reviso en el sistema. ¿Me regala su pasaporte, porfa?',
        translation: 'Pronto, meu irmão. Me dê um segundinho que já vou checar no sistema. Me vê o seu passaporte, por favor?',
        slangTip: '"Listo" significa ok/pronto. "Regalar" na Colômbia é usado para pedir algo gentilmente (não significa dar de graça).'
      },
      {
        id: 'h1_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Claro que sí, aquí tiene mi pasaporte. Espero que todo esté listo.',
        translation: 'Claro que sim, aqui está meu passaporte. Espero que tudo esteja pronto.',
        slangTip: '"Claro que sí" é muito usado para demonstrar presteza e boa educação.'
      },
      {
        id: 'h1_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡De una! Qué pena la demora, es que el sistema andaba lento, pero ya quedó su habitación lista. Es la trescientos dos.',
        translation: 'Com certeza! Desculpe a demora, é que o sistema estava meio lento, mas o seu quarto já está pronto. É o 302.',
        slangTip: '"¡De una!" significa "com certeza", "na hora", "imediatamente". "Qué pena" é desculpe/sinto muito.'
      },
      {
        id: 'h1_6',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Muchas gracias. ¿Me puede decir a qué hora es el desayuno?',
        translation: 'Muito obrigado. Você pode me dizer a que horas é o café da manhã?',
        slangTip: '"Desayuno" é café da manhã. Perguntar horários de forma simples e direta.'
      },
      {
        id: 'h1_7',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'El desayuno es de seis a diez en el restaurante principal. Es tipo buffet, bien bacano con arepas y calentao.',
        translation: 'O café da manhã é das 6h às 10h no restaurante principal. É tipo buffet, muito legal, com arepas e calentao (mexido típico).',
        slangTip: '"Calentao" é o prato típico feito com feijão e arroz do dia anterior, super comum no café colombiano.'
      },
      {
        id: 'h1_8',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Excelente, voy a probarlo mañana sin falta. ¡Muchas gracias por todo!',
        translation: 'Excelente, vou provar amanhã sem falta. Muito obrigado por tudo!',
        slangTip: '"Sin falta" significa sem falta, com certeza absoluta.'
      }
    ],
    slangGlossary: [
      { word: '¿Cómo me le va?', meaning: 'Como vai você? (Super típico e cordial)', example: 'Hola vecino, ¿cómo me le va?' },
      { word: 'Listo', meaning: 'Ok, combinado, pronto.', example: 'Listo, nos vemos a las cinco.' },
      { word: 'Regalar', meaning: 'Trazer ou dar (como empréstimo ou compra educada).', example: '¿Me regala un vaso de agua?' },
      { word: 'De una', meaning: 'Sim, claro, imediatamente!', example: '¿Vamos a comer? ¡De una!' },
      { word: 'Qué pena', meaning: 'Desculpe, sinto muito.', example: 'Qué pena llegar tarde, parcero.' }
    ]
  },
  {
    id: 'col_flerte_2',
    title: '2. Flertando na Praça de Provenza',
    category: 'Flerte',
    location: 'Medellín',
    description: 'Conversa descontraída e charmosa com Valentina na famosa rua de pedestres de Provenza.',
    turns: [
      {
        id: 'f2_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Hola, te vi medio perdido con el mapa. ¿Estás buscando algún sitio bacano para tomar algo?',
        translation: 'Olá, te vi meio perdido com o mapa. Está procurando algum lugar legal para tomar alguma coisa?',
        slangTip: '"Sitio bacano" é um lugar bem legal/maneiro.'
      },
      {
        id: 'f2_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, es que ando buscando un bar tranquilo pero con buena música. ¿Me recomiendas uno?',
        translation: 'Olá. Sim, é que estou procurando um bar tranquilo mas com música boa. Você me recomenda um?',
        slangTip: '"Ando buscando" significa "estou procurando" de forma super natural.'
      },
      {
        id: 'f2_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay, obvio! Aquí al lado hay un sitio que me encanta. Tienen cócteles deliciosos y el ambiente es una chimba.',
        translation: 'Ah, óbvio! Aqui do lado tem um lugar que eu amo. Eles têm coquetéis deliciosos e o ambiente é maravilhoso!',
        slangTip: '"Una chimba" é a gíria colombiana mais famosa para algo excelente, fantástico ou muito bom.'
      },
      {
        id: 'f2_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Suena excelente. ¿Y de casualidade no te gustaría acompañarme a tomar algo?',
        translation: 'Soa excelente. E por acaso você não gostaria de me acompanhar para tomar alguma coisa?',
        slangTip: '"De casualidad" significa "por acaso", uma forma polida e charmosa de convidar.'
      },
      {
        id: 'f2_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Tan charro! Me caes muy bien. De una, vamos por una pola y charlamos un ratico, que ando desocupada.',
        translation: 'Que engraçado/simpático! Gostei de você. Com certeza, vamos tomar uma cerveja e bater papo um pouquinho, estou livre.',
        slangTip: '"Tan charro" significa engraçado ou simpático no sotaque paisa. "Pola" é cerveja na Colômbia.'
      },
      {
        id: 'f2_6',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Qué bien! Me alegra mucho. Por cierto, bailas salsa o prefieres reguetón?',
        translation: 'Que ótimo! Me alegra muito. Aliás, você dança salsa ou prefere reggaeton?',
        slangTip: '"Por cierto" é aliás / por sinal.'
      },
      {
        id: 'f2_7',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay marica, las dos cosas! Como buena colombiana llevo el ritmo en la sangre. Te voy a enseñar a bailar reguetón paisa.',
        translation: 'Nossa, as duas coisas! Como boa colombiana levo o ritmo no sangue. Vou te ensinar a dançar reggaeton de Medellín (paisa).',
        slangTip: '"¡Ay marica!" é uma expressão de espanto/surpresa extremamente comum no dia a dia colombiano entre jovens (não necessariamente ofensiva).'
      },
      {
        id: 'f2_8',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Eso es un trato. ¡Prepárate porque soy un alumno muy aplicado!',
        translation: 'Isso é um trato. Prepare-se porque sou um aluno muito aplicado!',
        slangTip: '"Eso es un trato" significa "temos um trato / combinado".'
      }
    ],
    slangGlossary: [
      { word: 'Bacano', meaning: 'Legal, bom, agradável.', example: 'Este bar está muy bacano.' },
      { word: 'Una chimba', meaning: 'Algo sensacional, maravilhoso ou irado.', example: 'Esa canción es una chimba.' },
      { word: 'Tan charro', meaning: 'Engraçado, curioso ou peculiar.', example: 'Ese chiste estuvo tan charro.' },
      { word: 'Pola', meaning: 'Cerveja.', example: 'Vamos a tomarnos unas polas.' },
      { word: 'Ratico', meaning: 'Um pouquinho de tempo (diminutivo típico de rato).', example: 'Espérame un ratico.' }
    ]
  },
  {
    id: 'col_restaurante_3',
    title: '3. Pedido no Restaurante Típico',
    category: 'Restaurante',
    location: 'Medellín',
    description: 'Hora de almoçar. Você vai pedir uma autêntica Bandeja Paisa no restaurante.',
    turns: [
      {
        id: 'r3_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas! Bienvenidos al Rancherito. ¿Ya saben qué van a almorzar o les traigo la carta?',
        translation: 'Olá! Bem-vindos ao Rancherito. Vocês já sabem o que vão almoçar ou trago o cardápio?',
        slangTip: '"¡Buenas!" é um cumprimento curto extremamente usado na Colômbia a qualquer hora do dia.'
      },
      {
        id: 'r3_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Yo quiero pedir una bandeja paisa bien completa, por favor.',
        translation: 'Olá. Eu quero pedir uma bandeja paisa bem completa, por favor.',
        slangTip: 'Bandeja Paisa é o prato nacional mais famoso da região de Antioquia, super farto!'
      },
      {
        id: 'r3_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Excelente elección! Le sale con frijoles, arroz, carne molida, chicharrón bien carnudo, huevo, arepa y aguacate. ¿Y para tomar?',
        translation: 'Excelente escolha! Vem com feijão, arroz, carne moída, torresmo bem carnudo, ovo, arepa e abacate. E para beber?',
        slangTip: '"Le sale con" significa "acompanha / vem com". "Chicharrón carnudo" é o clássico torresmo colombiano.'
      },
      {
        id: 'r3_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¿Tiene algún jugo natural de frutas típicas de Colombia?',
        translation: 'Tem algum suco natural de frutas típicas da Colômbia?',
        slangTip: 'A Colômbia é famosa pela diversidade incrível de sucos naturais deliciosos.'
      },
      {
        id: 'r3_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Claro, veci! Tenemos jugo de lulo, de maracuyá, de guanábana y de mora. ¿Se lo preparo en agua o en leche?',
        translation: 'Claro, vizinho! Temos suco de lulo, maracujá, graviola e amora. Preparo na água ou no leite?',
        slangTip: '"Veci" (de vecino) é usado afetuosamente por atendentes de comércio na Colômbia como "amigo/parça".'
      },
      {
        id: 'r3_6',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Me regala uno de lulo en agua y bien frío, por favor.',
        translation: 'Me vê um de lulo na água e bem gelado, por favor.',
        slangTip: 'O lulo é uma fruta cítrica deliciosa e super refrescante típica dos Andes.'
      },
      {
        id: 'r3_7',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Listo! De una. Ya le paso el pedido a la cocina y en diez minuticos se lo traigo calentito a la mesa.',
        translation: 'Perfeito! Com certeza. Já passo o pedido para a cozinha e em dez minutinhos trago quentinho para a mesa.',
        slangTip: 'O uso de diminutivos como "minuticos" é uma característica muito fofa do sotaque colombiano.'
      },
      {
        id: 'r3_8',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Perfecto, quedo a la espera. Se me hace agua la boca.',
        translation: 'Perfeito, fico no aguardo. Estou com água na boca.',
        slangTip: '"Se me hace agua la boca" é uma expressão comum para dizer que está com muita vontade.'
      }
    ],
    slangGlossary: [
      { word: 'Veci', meaning: 'Vizinho/vizinha (usado informalmente para tratar clientes ou conhecidos de rua).', example: '¿Cuánto cuesta esto, veci?' },
      { word: 'Lulo', meaning: 'Fruta ácida andina deliciosa, muito popular em sucos.', example: 'El jugo de lulo es mi favorito.' },
      { word: 'Chicharrón', meaning: 'Torresmo frito crocante.', example: 'Ese chicharrón está gigante.' },
      { word: 'Regalar', meaning: 'Dar, trazer, vender (fórmula educada de pedido).', example: 'Me regala la cuenta, por favor.' },
      { word: 'Minuticos', meaning: 'Minutinhos (forma colombiana com sufixo "ico").', example: 'Dame cinco minuticos.' }
    ]
  },
  {
    id: 'col_taxi_4',
    title: '4. Pedindo um Táxi na Rua',
    category: 'Táxi',
    location: 'Bogotá',
    description: 'Chovendo muito em Bogotá e você precisa pegar um táxi com pressa para o aeroporto.',
    turns: [
      {
        id: 't4_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Buenas! Amigo, ¿está libre? Necesito ir con afán.',
        translation: 'Olá! Amigo, está livre? Preciso ir com pressa.',
        slangTip: '"Ir con afán" significa estar com pressa ou pressa urgente.'
      },
      {
        id: 't4_2',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: '¡Súbase rápido, patrón! Con este aguacero la ciudad se vuelve un caos absoluto. ¿Para dónde va?',
        translation: 'Suba rápido, patrão! Com este temporal a cidade vira um caos absoluto. Para onde você vai?',
        slangTip: '"Patrón" é uma forma respeitosa e muito popular na rua para se dirigir a um cliente homem.'
      },
      {
        id: 't4_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Voy para el Aeropuerto El Dorado. ¿Cuánto tiempo nos demoramos?',
        translation: 'Vou para o Aeroporto El Dorado. Quanto tempo vamos demorar?',
        slangTip: 'Aeroporto Internacional de Bogotá. Perguntar sobre o tempo de viagem.'
      },
      {
        id: 't4_4',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: 'Uf mi chino, a esta hora hay un trancón el berraco por la avenida El Dorado. Nos demoramos por ahí una hora.',
        translation: 'Nossa meu caro, a esta hora tem um engarrafamento bruto na avenida El Dorado. Vamos demorar por volta de uma hora.',
        slangTip: '"Trancón" é congestionamento. "El berraco" (ou berraco) significa forte, bruto, incrível ou difícil.'
      },
      {
        id: 't4_5',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡No me diga! Mi vuelo sale en dos horas. ¿No hay un atajo rápido?',
        translation: 'Não me diga! Meu voo sai em duas horas. Não tem um atalho rápido?',
        slangTip: '"¡No me diga!" é uma expressão de surpresa/preocupação ("Não me diga!", "Sério?").'
      },
      {
        id: 't4_6',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: 'Hágale, fresco. Yo me meto por unas calles internas que me conozco y lo dejo allá de una. Confíe en mí.',
        translation: 'Manda bala, relaxa. Eu entro por umas ruas internas que conheço e te deixo lá rapidinho. Confie em mim.',
        slangTip: '"Hágale" significa manda bala, vai em frente. "Fresco" significa tranquilo, relaxa.'
      },
      {
        id: 't4_7',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Listo, excelente. Le pago una buena propina si llegamos a tiempo.',
        translation: 'Fechado, excelente. Te pago uma boa gorjeta se chegarmos a tempo.',
        slangTip: '"Propina" é gorjeta (não suborno!). É totalmente legal e apreciada.'
      },
      {
        id: 't4_8',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: '¡Listo el pollo! Agárrese fuerte que vamos volando para que no pierda ese avión. ¡Dios lo bendiga!',
        translation: 'Tudo pronto! Segure-se firme que vamos voando para você não perder esse avião. Deus te abençoe!',
        slangTip: '"¡Listo el pollo!" é uma gíria engraçada colombiana para "está tudo resolvido/pronto!".'
      }
    ],
    slangGlossary: [
      { word: 'Afán', meaning: 'Pressa, urgência.', example: 'Tengo mucho afán por salir.' },
      { word: 'Trancón', meaning: 'Engarrafamento, congestionamento de trânsito.', example: 'Bogotá tiene mucho trancón.' },
      { word: 'Berraco', meaning: 'Muito forte, brabo, difícil ou alguém corajoso.', example: 'Ese trabajo está el berraco.' },
      { word: 'Hágale', meaning: 'Manda ver, vai em frente, faça isso.', example: '¿Compramos las entradas? ¡Hágale!' },
      { word: 'Listo el pollo', meaning: 'Expressão idiomática que significa "assunto resolvido" ou "tudo pronto".', example: 'Ya terminé la tarea, ¡listo el pollo!' }
    ]
  },
  {
    id: 'col_balada_5',
    title: '5. Noite de Rumba e Guaro',
    category: 'Balada',
    location: 'Cali',
    description: 'Você está em uma discoteca de salsa em Cali experimentando a famosa Rumba Colombiana.',
    turns: [
      {
        id: 'b5_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Sabor! Qué buen ambiente tiene esta discoteca. ¿Te animas a pedir una botella de aguardiente para empezar la rumba?',
        translation: 'Que sabor! Que ambiente bom tem esta discoteca. Você se anima a pedir uma garrafa de aguardiente para começar a festa?',
        slangTip: '"Guaro" ou "Aguardiente" é a bebida nacional da Colômbia. "Rumba" é festa/balada.'
      },
      {
        id: 'b5_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡De una! Yo pido el guaro. ¿Se toma puro o con agua de acompañamiento?',
        translation: 'Com certeza! Eu peço o aguardente. Toma-se puro ou com água para acompanhar?',
        slangTip: '"Guaro" é a forma abreviada e mais popular de se referir ao aguardiente antioqueño.'
      },
      {
        id: 'b5_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Se toma en shots puros y con limón. ¡Salud, parce! Que esta noche promete estar de ataque.',
        translation: 'Toma-se em shots puros e com limão. Saúde, parceiro! Que esta noite promete ser sensacional.',
        slangTip: '"De ataque" significa espetacular, incrível ou muito chamativo.'
      },
      {
        id: 'b5_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Salud! Está un poco fuerte pero muy rico. ¿Qué canción está sonando?',
        translation: 'Saúde! Está um pouco forte mas muito gostoso. Que música está tocando?',
        slangTip: 'Praticar perguntas espontâneas no ambiente barulhento da balada.'
      },
      {
        id: 'b5_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Es un clásico del Grupo Niche, salsa caleña de la buena. ¡Venga, no se quede ahí sentado y sáqueme a bailar!',
        translation: 'É um clássico do Grupo Niche, salsa de Cali da boa. Venha, não fique aí sentado e me tire para dançar!',
        slangTip: 'Grupo Niche é a maior banda de salsa da história da Colômbia. "Sáqueme a bailar" = me tire para dançar.'
      },
      {
        id: 'b5_6',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Tengo que advertirte que no sé bailar mucha salsa, pero hago el intento.',
        translation: 'Tenho que te advertir que não sei dançar muita salsa, mas vou tentar.',
        slangTip: '"Hacer el intento" significa dar o melhor de si ou fazer uma tentativa.'
      },
      {
        id: 'b5_7',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'No te preocupes, parcero. Solo sigue mi ritmo y déjate llevar. ¡Aquí lo importante es pasarla bien y azotar baldosa!',
        translation: 'Não se preocupe, parceiro. Só siga meu ritmo e se deixe levar. Aqui o importante é se divertir e quebrar tudo na pista de dança!',
        slangTip: '"Azotar baldosa" é uma expressão caleña divertidíssima para descrever dançar salsa com muita energia limpando o chão.'
      },
      {
        id: 'b5_8',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Listo, vamos con toda! ¡A azotar baldosa se ha dicho!',
        translation: 'Pronto, vamos com tudo! Quebrar tudo na pista, como se diz!',
        slangTip: '"Vamos con toda" significa dar 100% de si em algo.'
      }
    ],
    slangGlossary: [
      { word: 'Guaro', meaning: 'Aguardiente (bebida alcoólica típica de anis colombiana).', example: 'Tráiganos media de guaro, por favor.' },
      { word: 'Rumba', meaning: 'Festa, balada, ato de sair para dançar.', example: 'Hoy nos fuimos de rumba.' },
      { word: 'De ataque', meaning: 'Incrível, excelente, maravilhoso.', example: 'Esa fiesta estuvo de ataque.' },
      { word: 'Azotar baldosa', meaning: 'Dançar salsa intensamente (literalmente: açoitar a cerâmica/piso).', example: 'Fuimos a Juanchito a azotar baldosa.' },
      { word: 'Parcero', meaning: 'Mano, parça, amigo íntimo.', example: '¿Qué hubo, parcero?' }
    ]
  },
  {
    id: 'col_restaurante_6',
    title: '6. Café da Manhã Tradicional',
    category: 'Restaurante',
    location: 'Bogotá',
    description: 'Experimentando pratos matinais de Bogotá com chocolate quente e queijo.',
    turns: [
      {
        id: 'r6_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Buenos días. Para este frío bogotano les recomiendo una changua o un chocolate completo. ¿Qué prefieren?',
        translation: 'Bom dia. Para este frio de Bogotá recomendo uma changua (sopa típica) ou um chocolate completo. O que preferem?',
        slangTip: '"Changua" é uma sopa de leite, ovo, coentro e pão típica de Bogotá. Chocolate completo acompanha queijo e pão.'
      },
      {
        id: 'r6_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Prefiero el chocolate completo. ¿Es verdad que se le mete el queso adentro?',
        translation: 'Prefiro o chocolate completo. É verdade que se coloca o queijo dentro?',
        slangTip: 'Costume colombiano curioso de derreter o queijo salgado dentro da xícara de chocolate quente doce!'
      },
      {
        id: 'r6_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Por supuesto! Es una delicia, el queso se derrite y queda espectacular. Pruébelo de una y me cuenta.',
        translation: 'Com certeza! É uma delícia, o queijo derrete e fica espetacular. Prove logo e me conta.',
        slangTip: 'O queijo usado geralmente é o "queso doble crema" ou campesino.'
      },
      {
        id: 'r6_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Listo, me convenciste. Tráeme un chocolate completo y una porción de almojábanas.',
        translation: 'Pronto, me convenceu. Me traga um chocolate completo e uma porção de almojábanas (pãezinhos de queijo).',
        slangTip: '"Almojábana" é um pãozinho de queijo assado super fofinho andino.'
      }
    ],
    slangGlossary: [
      { word: 'Changua', meaning: 'Sopa bogotana tradicional de leite com ovo e coentro.', example: 'A mí me encanta desayunar changua.' },
      { word: 'Chocolate completo', meaning: 'Chocolate quente servido com queijo fresco e pão.', example: 'Un chocolate completo para calentar el cuerpo.' },
      { word: 'Almojábana', meaning: 'Pão de queijo típico assado à base de farinha de milho.', example: 'Comí almojábana caliente.' }
    ]
  },
  {
    id: 'col_hotel_7',
    title: '7. Problemas com a Água Quente',
    category: 'Hotel',
    location: 'Bogotá',
    description: 'Reclamando na recepção de forma educada e colombiana sobre a falta de água quente.',
    turns: [
      {
        id: 'h7_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Qué pena molestar, pero es que no sale agua caliente en mi ducha.',
        translation: 'Desculpe incomodar, mas é que não está saindo água quente no meu chuveiro.',
        slangTip: '"Qué pena molestar" é a frase de ouro colombiana para reclamações educadas.'
      },
      {
        id: 'h7_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay, qué pena con usted, mi señor! Déjeme ya mismo mando al técnico para que le arregle ese chicharrón.',
        translation: 'Nossa, desculpe-me, meu senhor! Deixe-me mandar agora mesmo o técnico para resolver esse problemão.',
        slangTip: '"Chicharrón" na Colômbia também significa um problema difícil de resolver ou pepino.'
      },
      {
        id: 'h7_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Perfecto, le agradezco mucho. Me urge bañarme para salir a un tour.',
        translation: 'Perfeito, te agradeço muito. Preciso muito tomar banho para sair para um passeio.',
        slangTip: '"Me urge" é uma forma elegante de demonstrar urgência imediata.'
      },
      {
        id: 'h7_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'No se preocupe, en cinco minutos está solucionado. ¡Qué pena de verdad con usted!',
        translation: 'Não se preocupe, em cinco minutos está solucionado. Mil desculpas mesmo com o senhor!',
        slangTip: '"Qué pena de verdad" reforça a extrema cortesia cultural colombiana.'
      }
    ],
    slangGlossary: [
      { word: 'Qué pena con usted', meaning: 'Mil desculpas com você (fórmula de extrema educação).', example: 'Qué pena con usted por el error.' },
      { word: 'Chicharrón (problema)', meaning: 'Problema difícil, pepino, aborrecimento.', example: 'Tengo que solucionar este chicharrón en la oficina.' }
    ]
  },
  {
    id: 'col_flerte_8',
    title: '8. Pedindo o WhatsApp com Charme',
    category: 'Flerte',
    location: 'Cali',
    description: 'Bate-papo romântico no mirante de San Antonio e o momento de pedir o contato.',
    turns: [
      {
        id: 'f8_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'La vista desde aquí está hermosa, pero creo que tú eres la que se roba el paisaje.',
        translation: 'A vista daqui é linda, mas acho que você é quem rouba a paisagem.',
        slangTip: 'Frase romântica de flerte clássica e suave.'
      },
      {
        id: 'f8_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ave María! Me vas a hacer sonrojar, parcero. Eres muy coqueto y formal.',
        translation: 'Nossa Senhora! Você vai me fazer corar, parceiro. Você é muito paquerador e educado.',
        slangTip: '"¡Ave María!" é uma interjeição paisa/colombiana fortíssima de espanto ou emoção.'
      },
      {
        id: 'f8_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Solo digo la verdad. ¿Me regalas tu número para que sigamos hablando por WhatsApp?',
        translation: 'Só digo a verdade. Me passa seu número para continuarmos conversando pelo WhatsApp?',
        slangTip: 'Uso prático de "me regalas tu número" para pedir o contato de forma amigável.'
      },
      {
        id: 'f8_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Bueno, de una. Anota ahí pues, pero me escribes rápido para no perder la pista.',
        translation: 'Bom, com certeza. Anota aí então, mas me escreve rápido para não perdermos o contato.',
        slangTip: '"Pues" é usado para reforçar uma ação ("anota ahí pues").'
      }
    ],
    slangGlossary: [
      { word: '¡Ave María!', meaning: 'Expressão de surpresa, admiração ou espanto.', example: '¡Ave María, qué comida tan rica!' },
      { word: 'Coqueto', meaning: 'Charmoso, galanteador, paquerador.', example: 'Eres un chico muy coqueto.' }
    ]
  },
  {
    id: 'col_taxi_9',
    title: '9. Negociando Preço com o Taxista',
    category: 'Táxi',
    location: 'Cartagena',
    description: 'Em Cartagena não há taxímetro, então você precisa negociar a tarifa antes de entrar.',
    turns: [
      {
        id: 't9_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Buenas tardes. ¿Cuánto me cobra para llevarme a la Ciudad Amurallada?',
        translation: 'Boa tarde. Quanto me cobra para me levar à Cidade Muralhada?',
        slangTip: '"¿Cuánto me cobra para..." é a pergunta padrão em cidades sem taxímetro.'
      },
      {
        id: 't9_2',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: 'Buenas, jefe. Le cobro veinte mil pesitos por el viaje, la tarifa es fija.',
        translation: 'Olá, chefe. Te cobro vinte mil pesinhos pela viagem, a tarifa é fixa.',
        slangTip: '"Jefe" é equivalente a "patrão" ou "chefe" para tratar o passageiro masculino.'
      },
      {
        id: 't9_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Ay caramba! Eso está muy caro, amigo. ¿No me lo deja en quince mil?',
        translation: 'Nossa! Isso está muito caro, amigo. Não faz por quinze mil?',
        slangTip: 'Técnica de barganha clássica na costa colombiana.'
      },
      {
        id: 't9_4',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: 'Bueno, hágale pues, súbase de una vez y nos vamos antes de que empiece el trancón.',
        translation: 'Bom, manda bala então, suba de uma vez e vamos antes que comece o engarrafamento.',
        slangTip: '"Hágale pues" aceita a barganha amigavelmente.'
      }
    ],
    slangGlossary: [
      { word: 'Jefe', meaning: 'Chefe (tratamento cordial de rua).', example: 'Pase por aquí, jefe.' },
      { word: 'Pesitos', meaning: 'Forma fofa para se referir aos Pesos Colombianos (COP).', example: 'Préstame diez mil pesitos.' }
    ]
  },
  {
    id: 'col_balada_10',
    title: '10. Entrando na Lista VIP da Balada',
    category: 'Balada',
    location: 'Medellín',
    description: 'Falando com a promotora de eventos na porta de uma balada super concorrida.',
    turns: [
      {
        id: 'b10_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, buenas noches. Estoy en la lista de invitados de Valentina.',
        translation: 'Olá, boa noite. Estou na lista de convidados da Valentina.',
        slangTip: 'Uso formal-casual para se apresentar na entrada do evento.'
      },
      {
        id: 'b10_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! Ah sí, aquí te tengo anotado. Sigue de una, hoy el parche va a estar re bueno adentro.',
        translation: 'Olá! Ah sim, aqui tenho você anotado. Pode entrar direto, hoje o grupo de amigos (rolê) vai estar super bom lá dentro.',
        slangTip: '"El parche" é o rolê, encontro ou turma de amigos na gíria colombiana.'
      },
      {
        id: 'b10_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Qué chimba! ¿A qué hora empieza a tocar el DJ invitado?',
        translation: 'Que irado! A que horas o DJ convidado começa a tocar?',
        slangTip: '"¡Qué chimba!" expressa grande entusiasmo positivo.'
      },
      {
        id: 'b10_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'A la medianoche en punto monta su show. ¡A rumbear con toda, parcero!',
        translation: 'À meia-noite em ponto ele começa o show. Bora curtir a balada com tudo, parceiro!',
        slangTip: '"Montar su show" ou tocar. Desejo de boa balada.'
      }
    ],
    slangGlossary: [
      { word: 'El parche', meaning: 'O rolê, o programa combinado, grupo de amigos.', example: '¿Cuál es el parche de hoy?' },
      { word: 'Qué chimba', meaning: 'Que irado! Que massa! Que legal!', example: '¡Ganamos el partido, qué chimba!' }
    ]
  },
  {
    id: 'col_hotel_11',
    title: '11. Pedindo Wi-Fi na Recepção',
    category: 'Hotel',
    location: 'Cali',
    description: 'Você precisa de internet para trabalhar urgente e pede o Wi-Fi.',
    turns: [
      {
        id: 'h11_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Qué pena, ¿me regalas la contraseña del Wi-Fi de acá?',
        translation: 'Desculpe, me vê a senha do Wi-Fi daqui?',
        slangTip: 'Pedir educadamente usando "me regalas la contraseña".'
      },
      {
        id: 'h11_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Con mucho gusto! La red es "HotelCali_VIP" y la contraseña es "parceiros2026". Todo en minúsculas.',
        translation: 'Com muito prazer! A rede é "HotelCali_VIP" e a senha é "parceiros2026". Tudo em minúsculas.',
        slangTip: '"¡Con mucho gusto!" é a resposta padrão colombiana extremamente calorosa para "de nada".'
      },
      {
        id: 'h11_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Muchas gracias. ¿Tiene buena velocidad para hacer videollamadas?',
        translation: 'Muito obrigado. Tem velocidade boa para fazer chamadas de vídeo?',
        slangTip: '"Videollamada" é videochamada.'
      },
      {
        id: 'h11_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Sí, fresco. Es de fibra óptica, corre súper rápido para que camelle tranquilo sin cortes.',
        translation: 'Sim, relaxa. É de fibra óptica, roda super rápido para você trabalhar tranquilo sem cortes.',
        slangTip: '"Camellar" é uma gíria colombiana genial para trabalhar.'
      }
    ],
    slangGlossary: [
      { word: 'Con mucho gusto', meaning: 'De nada / Com prazer (extremamente comum).', example: 'Gracias por la comida. - Con mucho gusto.' },
      { word: 'Camellar', meaning: 'Trabalhar arduamente (gíria muito popular).', example: 'Me toca camellar duro mañana.' }
    ]
  },
  {
    id: 'col_flerte_12',
    title: '12. Elogiando o Sotaque dela',
    category: 'Flerte',
    location: 'Medellín',
    description: 'Elogiando de forma fofa o sotaque doce e cantado das mulheres colombianas.',
    turns: [
      {
        id: 'f12_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Tienes que saber que me encanta cómo hablas, tu acento es una delicia.',
        translation: 'Você precisa saber que eu amo como você fala, o seu sotaque é uma delícia.',
        slangTip: 'Elogio gentil e genuíno sobre a doçura do sotaque colombiano.'
      },
      {
        id: 'f12_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Tan tierno! El acento paisa es bien cantadito, ¿cierto? A los extranjeros los vuelve locos.',
        translation: 'Que fofo! O sotaque paisa (de Medellín) é bem cantadinho, né? Deixa os estrangeiros loucos.',
        slangTip: '"Paisa" é o gentílico de quem nasce em Medellín e região de Antioquia.'
      },
      {
        id: 'f12_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Pues sí, me tiene totalmente cautivado. ¿Me enseñas más palabras locales?',
        translation: 'Pois é, me deixou totalmente cativado. Você me ensina mais palavras locais?',
        slangTip: 'Gancho perfeito para manter a conversa fluindo com cumplicidade.'
      },
      {
        id: 'f12_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'De una, mi cielo. Te voy a dar clases de paisa todos los días si quieres.',
        translation: 'Com certeza, meu querido (céu). Vou te dar aulas de paisa todos os dias se você quiser.',
        slangTip: '"Mi cielo" é uma expressão carinhosa muito comum na Colômbia.'
      }
    ],
    slangGlossary: [
      { word: 'Paisa', meaning: 'Pessoa natural de Medellín ou região cafeeira.', example: 'Ella es una chica paisa muy alegre.' },
      { word: 'Mi cielo', meaning: 'Meu querido, meu amor (expressão carinhosa).', example: 'Hola mi cielo, ¿cómo estás?' }
    ]
  },
  {
    id: 'col_restaurante_13',
    title: '13. Comprando Arepas na Esquina',
    category: 'Restaurante',
    location: 'Bogotá',
    description: 'Comprando a famosa arepa recheada na barraquinha de rua com a "parcera".',
    turns: [
      {
        id: 'r13_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola vecina, ¿a cómo tiene las arepas de queso con mantequilla?',
        translation: 'Olá vizinha, quanto custam as arepas de queijo com manteiga?',
        slangTip: '"¿A cómo tiene...?" é a pergunta clássica de feira e barraquinhas na Colômbia.'
      },
      {
        id: 'r13_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola, mi rey! Las tengo a cinco mil pesitos, bien cargadas de queso y asadas al carbón.',
        translation: 'Olá, meu rei! Custam cinco mil pesinhos, bem cheias de queijo e assadas na brasa.',
        slangTip: '"Mi rey" (ou mi reina) é usado por vendedoras populares para tratar clientes com muito carinho.'
      },
      {
        id: 'r13_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Uf, qué delicia. Prepárame dos bien calientes, por favor.',
        translation: 'Nossa, que delícia. Prepara duas bem quentes para mim, por favor.',
        slangTip: '"Prepárame..." pede a comida personalizada.'
      },
      {
        id: 'r13_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, en un momentico salen bien doraditas. ¿Les echa ají picante?',
        translation: 'Pronto, em um instantinho saem bem douradinhas. Quer colocar molho de pimenta (ají)?',
        slangTip: '"Ají" é o molho de pimenta tradicional colombiano, feito com coentro, cebola e tomate.'
      }
    ],
    slangGlossary: [
      { word: 'Mi rey / Mi reina', meaning: 'Querido / Querida (termo carinhoso de atendimento popular).', example: 'Pase por aquí, mi reina.' },
      { word: '¿A cómo tiene...?', meaning: 'Quanto custa...? (Muito usado no comércio de rua).', example: 'Veci, ¿a cómo tiene los lulos?' }
    ]
  },
  {
    id: 'col_taxi_14',
    title: '14. Pedindo para Ligar o Ar Condicionado',
    category: 'Táxi',
    location: 'Cali',
    description: 'Está fazendo 34 graus em Cali e você pede ajuda com o calor dentro do carro.',
    turns: [
      {
        id: 't14_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Qué pena, amigo. ¿Será que puede prender el aire acondicionado? Está haciendo un calor el berraco.',
        translation: 'Desculpe, amigo. Será que você pode ligar o ar condicionado? Está fazendo um calor danado.',
        slangTip: '"¿Será que puede...?" é uma forma super educada de pedir favores na Colômbia.'
      },
      {
        id: 't14_2',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: '¡De una, mi viejo! Qué pena con usted, es que Cali es una sucursal del cielo pero con calor de infierno hoy.',
        translation: 'Com certeza, meu amigo! Desculpe-me, é que Cali é a sucursal do céu, mas com calor de inferno hoje.',
        slangTip: '"Mi viejo" significa "meu velho / amigo". Cali é carinhosamente apelidada de "sucursal del cielo" (filial do céu).'
      },
      {
        id: 't14_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Jaja, sí, se nota que aquí la gente es caliente y alegre como el clima.',
        translation: 'Haha, sim, dá para notar que aqui as pessoas são calorosas e alegres como o clima.',
        slangTip: '"Se nota que" é "dá para notar que".'
      },
      {
        id: 't14_4',
        speaker: 'Taxista',
        isUserTurn: false,
        spanish: 'Así es, aquí se goza sabroso. Listo, ahí ya le subí toda la potencia al aire.',
        translation: 'É isso mesmo, aqui a gente curte gostoso. Pronto, já aumentei toda a potência do ar para você.',
        slangTip: '"Gozar sabroso" significa aproveitar a vida ao máximo com muita alegria.'
      }
    ],
    slangGlossary: [
      { word: 'Mi viejo', meaning: 'Meu amigo, parceiro.', example: 'Hola mi viejo, ¿cómo va el día?' },
      { word: 'Gozar sabroso', meaning: 'Aproveitar a vida com extrema alegria e leveza.', example: 'En Cali venimos a gozar sabroso.' }
    ]
  },
  {
    id: 'col_balada_15',
    title: '15. Comprando outra Garrafa',
    category: 'Balada',
    location: 'Medellín',
    description: 'A garrafa de guaro acabou e o rolê está animado. Hora de pedir mais uma!',
    turns: [
      {
        id: 'b15_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Oye Valentina, ya nos tomamos la media botella de guaro. ¿Pedimos una entera?',
        translation: 'Ei Valentina, já tomamos a meia garrafa de aguardente. Pedimos uma inteira?',
        slangTip: '"Media" na Colômbia refere-se a garrafa de 375ml (meia garrafa).'
      },
      {
        id: 'b15_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay juepucha, claro que sí! Esta rumba está deliciosa y la música está una chimba. ¡Trae la otra de una!',
        translation: 'Caramba, claro que sim! Esta festa está deliciosa e a música está incrível. Traz a outra agora mesmo!',
        slangTip: '"¡Juepucha!" é uma expressão de surpresa/entusiasmo muito comum (uma versão limpa de caralho/caramba).'
      },
      {
        id: 'b15_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Mesero, por favor, me trae otra botella de aguardiente azul sin azúcar.',
        translation: 'Garçom, por favor, me traz outra garrafa de aguardente azul sem açúcar.',
        slangTip: '"Aguardiente sin azúcar" (rótulo azul) é o mais pedido porque dá menos ressaca.'
      },
      {
        id: 'b15_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Eso, parce. Hoy salimos de aquí directo a desayunar calentao mañana sin dormir. ¡Qué chimba de parche!',
        translation: 'Isso aí, parceiro. Hoje saímos daqui direto para comer calentao no café sem dormir. Que rolê irado!',
        slangTip: 'Prática de virar a noite festejando ("seguir de largo").'
      }
    ],
    slangGlossary: [
      { word: 'Juepucha / Juepa', meaning: 'Caramba! Caraca! (Interjeição popular não vulgar).', example: '¡Juepucha, se me quedaron las llaves!' },
      { word: 'Media botella', meaning: 'Garrafa pequena de 375ml.', example: 'Pedimos una media de ron.' }
    ]
  },
  {
    id: 'col_hotel_16',
    title: '16. Pedindo Toalhas Extras',
    category: 'Hotel',
    location: 'Cartagena',
    description: 'Falando com a camareira do hotel para pedir toalhas adicionais para a piscina.',
    turns: [
      {
        id: 'h16_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, buenas tardes. ¿Me podría regalar dos toallas más para la habitación, por favor?',
        translation: 'Olá, boa tarde. Você poderia me dar mais duas toalhas para o quarto, por favor?',
        slangTip: 'Pedido polido usando "me podría regalar".'
      },
      {
        id: 'h16_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Con mucho gusto! En un momentico se las llevo. ¿Necesita algo más, cobijas o almohadas?',
        translation: 'Com todo prazer! Em um instantinho levo para o senhor. Precisa de algo mais, cobertores ou travesseiros?',
        slangTip: '"Cobijas" é a palavra colombiana para cobertores.'
      },
      {
        id: 'h16_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'No, solo las toallas está perfecto. Es usted muy amable.',
        translation: 'Não, só as toalhas está perfeito. Você é muito amável.',
        slangTip: 'Agradecimento simples e caloroso.'
      },
      {
        id: 'h16_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Es con todo el cariño del mundo. Que disfrute de su estadía.',
        translation: 'É com todo o carinho do mundo. Que aproveite a sua estadia.',
        slangTip: 'Demonstração da hospitalidade colombiana lendária.'
      }
    ],
    slangGlossary: [
      { word: 'Cobijas', meaning: 'Cobertores / edredons.', example: 'La noche está fría, pásame las cobijas.' }
    ]
  },
  {
    id: 'col_flerte_17',
    title: '17. Convidando para Jantar',
    category: 'Flerte',
    location: 'Bogotá',
    description: 'Convidando-a para jantar em um restaurante bacana na Zona T.',
    turns: [
      {
        id: 'f17_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Oye, conozco un sitio espectacular de comida fusión en la Zona T. ¿Me acompañas hoy?',
        translation: 'Ei, conheço um lugar espetacular de comida fusão na Zona T. Me acompanha hoje?',
        slangTip: 'Zona T é a área nobre e gastronômica de Bogotá.'
      },
      {
        id: 'f17_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay marica, qué buen plan! Me fascina esa zona. ¿A qué hora pasas por mí?',
        translation: 'Nossa, que ótimo plano! Me fascina essa área. Que horas você passa para me buscar?',
        slangTip: '"Qué buen plan" é um ótimo programa/rolê.'
      },
      {
        id: 'f17_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Paso por ti a las ocho de la noche en un Uber, ¿te parece bien?',
        translation: 'Passo para te pegar às 20h de Uber, parece bom para você?',
        slangTip: 'Combinar horários de forma direta.'
      },
      {
        id: 'f17_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, me parece regio. Te espero bien bonita y lista para pasarla espectacular.',
        translation: 'Pronto, acho ótimo (régio). Te espero bem bonita e pronta para nos divertirmos de forma espetacular.',
        slangTip: '"Regio" é uma expressão elegante colombiana para excelente/maravilhoso.'
      }
    ],
    slangGlossary: [
      { word: 'Regio', meaning: 'Ótimo, excelente, elegante.', example: 'Su propuesta me parece regia, jefe.' },
      { word: 'Buen plan', meaning: 'Ótimo convite / bom programa.', example: 'Ir al cine es un buen plan.' }
    ]
  },
  {
    id: 'col_restaurante_18',
    title: '18. Pedindo a Conta no Bar',
    category: 'Restaurante',
    location: 'Medellín',
    description: 'Finalizando a noite, você pede a conta de forma natural.',
    turns: [
      {
        id: 'Você',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Mesero, qué pena con usted, ¿me regala la cuenta cuando pueda?',
        translation: 'Garçom, desculpe. Me vê a conta quando puder?',
        slangTip: 'Uso de "me regala la cuenta" para pedir a conta educadamente.'
      },
      {
        id: 'r18_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡De una, jefe! ¿Desea pagar todo junto o cuentas separadas? Recibimos efectivo y tarjeta.',
        translation: 'Na hora, chefe! Deseja pagar tudo junto ou contas separadas? Aceitamos dinheiro e cartão.',
        slangTip: '"Efectivo" é dinheiro vivo.'
      },
      {
        id: 'r18_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Vamos a pagar todo junto y con tarjeta de crédito, por favor.',
        translation: 'Vamos pagar tudo junto e com cartão de crédito, por favor.',
        slangTip: '"Pagar todo junto" facilita.'
      },
      {
        id: 'r18_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, de una. Ya le acerco el datáfono a la mesa. Muchas gracias por su visita.',
        translation: 'Combinado. Já levo a maquininha de cartão (datáfono) até a mesa. Muito obrigado pela visita.',
        slangTip: '"Datáfono" é a palavra colombiana para a maquininha de cartão de débito/crédito.'
      }
    ],
    slangGlossary: [
      { word: 'Datáfono', meaning: 'Maquininha de cartão (débito/crédito).', example: '¿Me trae el datáfono, por favor?' },
      { word: 'Efectivo', meaning: 'Dinheiro vivo.', example: 'Solo tengo efectivo para pagar el taxi.' }
    ]
  },
  {
    id: 'col_taxi_19',
    title: '19. Esqueci a Carteira no Carro',
    category: 'Táxi',
    location: 'Bogotá',
    description: 'Momento de pânico: você percebe que a carteira ficou no banco de trás.',
    turns: [
      {
        id: 't19_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Ay juepucha! Creo que dejé mi billetera en el asiento de atrás del taxi.',
        translation: 'Caramba! Acho que deixei minha carteira no banco de trás do táxi.',
        slangTip: '"Billetera" é carteira. Expressão de pânico usando "juepucha".'
      },
      {
        id: 't19_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡No me diga! Menos mal pedimos el taxi por la aplicación de celular, déjeme ya mismo llamo al chofer.',
        translation: 'Não brinque! Menos mal que pedimos o táxi pelo aplicativo de celular, deixe-me ligar agora mesmo para o motorista.',
        slangTip: 'Importância de usar aplicativos de transporte para segurança.'
      },
      {
        id: 't19_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Qué alivio! Dile que le pago el viaje de vuelta si me la trae rápido.',
        translation: 'Que alívio! Diga a ele que pago a corrida de volta se ele me trouxer rápido.',
        slangTip: '"Dile que..." instrução direta para negociar.'
      },
      {
        id: 't19_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, ya me contestó y viene para acá de una. El señor es súper honrado, ¡qué buena suerte!',
        translation: 'Pronto, já me atendeu e vem vindo correndo para cá. O senhor é super honesto, que sorte!',
        slangTip: '"Honrado" significa honesto.'
      }
    ],
    slangGlossary: [
      { word: 'Billetera', meaning: 'Carteira de dinheiro.', example: 'Perdí mi billetera ayer.' }
    ]
  },
  {
    id: 'col_balada_20',
    title: '20. Tomando Calentao Pós-Rumba',
    category: 'Balada',
    location: 'Medellín',
    description: 'Terminando o rolê às 4h da manhã comendo a lendária comida pós-balada na rua.',
    turns: [
      {
        id: 'b20_1',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Esta rumba estuvo la locura total, pero ahora tengo un hambre increíble.',
        translation: 'Esta balada foi uma loucura total, mas agora estou com uma fome incrível.',
        slangTip: '"Estuvo la locura" significa que foi sensacional ou espetacular.'
      },
      {
        id: 'b20_2',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay sí, marica, yo también! Vamos ya mismo por un calentao paisa bien trancado en esa esquina de allí.',
        translation: 'Ah sim, cara, eu também! Vamos agora mesmo comer um mexido paisa bem reforçado naquela esquina ali.',
        slangTip: '"Trancado" ou "bien trancado" significa muito farto, reforçado ou gigante.'
      },
      {
        id: 'b20_3',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Excelente idea! Ese calentao nos va a revivir el alma por completo.',
        translation: 'Excelente ideia! Esse mexido vai reviver a nossa alma por completo.',
        slangTip: 'Prato reconfortante após a noitada.'
      },
      {
        id: 'b20_4',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'De una, parcero. Comemos delicioso y nos vamos a dormir felices. ¡Medellín es lo máximo!',
        translation: 'Com certeza, parceiro. Comemos deliciosamente bem e vamos dormir felizes. Medellín é o máximo!',
        slangTip: 'Final feliz do rolê colombiano.'
      }
    ],
    slangGlossary: [
      { word: 'Bien trancado', meaning: 'Farto, pesado, bem servido de comida.', example: 'Quiero un almuerzo bien trancado.' }
    ]
  }
];
