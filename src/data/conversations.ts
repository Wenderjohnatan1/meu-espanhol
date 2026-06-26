import { SlangGlossaryItem } from '../types';

export interface ConversationTurn {
  id: string;
  speaker: string;
  isUserTurn: boolean;
  spanish: string;
  translation: string;
  slangTip?: string;
}

export interface Conversation {
  id: string;
  title: string;
  category: 'Hotel' | 'Flerte' | 'Restaurante' | 'Táxi' | 'Balada' | 'Cotidiano';
  location: string;
  dialect: 'colombia' | 'mexico';
  description: string;
  turns: ConversationTurn[];
  slangGlossary: SlangGlossaryItem[];
}

export const conversations: Conversation[] = [
  // COLOMBIA (Conversations 1-15)
  {
    id: 'col_1',
    title: '1. Registro em El Poblado',
    category: 'Hotel',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Você acaba de chegar ao hotel e fala com Valentina na recepção.',
    turns: [
      {
        id: 'c1_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas tardes! Qué más, bienvenido a Medellín. ¿Cómo me le va?',
        translation: 'Boa tarde! E aí, bem-vindo a Medellín. Como vai?',
        slangTip: '"¿Cómo me le va?" é uma forma super cortês de perguntar "como vai você?".'
      },
      {
        id: 'c1_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, muy bien, gracias. Tengo una reserva a nombre de Juan.',
        translation: 'Olá, muito bem, obrigado. Tenho uma reserva em nome de Juan.',
        slangTip: 'Frase simples de check-in para iniciar a conversa.'
      },
      {
        id: 'c1_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, mi hermano. Déme un segundito que ya le reviso. ¿Me regala su pasaporte, porfa?',
        translation: 'Pronto, meu irmão. Me dê um segundinho que já vou checar. Me vê o seu passaporte, por favor?',
        slangTip: '"Listo" significa ok/pronto. "Regalar" é usado para pedir algo gentilmente.'
      },
      {
        id: 'c1_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Claro que sí, aquí tiene mi pasaporte. Espero que todo esté listo.',
        translation: 'Claro que sim, aqui está meu passaporte. Espero que tudo esteja pronto.',
        slangTip: '"Claro que sí" demonstra educação.'
      },
      {
        id: 'c1_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡De una! Ya quedó su habitación lista. Es la trescientos dos. Disfrute su estadía.',
        translation: 'Com certeza! Seu quarto já ficou pronto. É o 302. Aproveite sua estadia.',
        slangTip: '"¡De una!" significa "com certeza", "na hora", "imediatamente".'
      }
    ],
    slangGlossary: [
      { word: '¿Cómo me le va?', meaning: 'Como vai você? (Super cordial)', example: 'Hola vecino, ¿cómo me le va?' },
      { word: 'Listo', meaning: 'Ok, combinado, pronto.', example: 'Listo, nos vemos en la plaza.' },
      { word: 'Regalar', meaning: 'Trazer ou dar (como empréstimo ou compra educada).', example: '¿Me regala un tinto?' },
      { word: 'De una', meaning: 'Sim, claro, imediatamente!', example: '¿Vamos a comer? ¡De uma!' }
    ]
  },
  {
    id: 'col_2',
    title: '2. Flertando em Provenza',
    category: 'Flerte',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Conversa charmosa com Valentina na famosa rua de pedestres de Provenza.',
    turns: [
      {
        id: 'c2_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Hola, te vi medio perdido. ¿Buscas algún sitio bacano para tomar algo?',
        translation: 'Olá, te vi meio perdido. Está procurando algum lugar legal para tomar alguma coisa?',
        slangTip: '"Sitio bacano" é um lugar bem legal/maneiro.'
      },
      {
        id: 'c2_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, es que ando buscando un bar tranquilo. ¿Me recomiendas uno?',
        translation: 'Olá. Sim, é que estou procurando um bar tranquilo. Você me recomenda um?',
        slangTip: '"Ando buscando" significa "estou procurando" de forma super natural.'
      },
      {
        id: 'c2_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay, obvio! Aquí hay un sitio delicioso y el ambiente es una chimba.',
        translation: 'Ah, óbvio! Aqui tem um lugar delicioso e o ambiente é maravilhoso!',
        slangTip: '"Una chimba" é a gíria colombiana mais famosa para algo excelente, fantástico ou muito bom.'
      },
      {
        id: 'c2_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Suena excelente. ¿Y de casualidad no te gustaría acompañarme a tomar algo?',
        translation: 'Soa excelente. E por acaso você não gostaria de me acompanhar para tomar alguma coisa?',
        slangTip: '"De casualidad" significa "por acaso", uma forma polida de convidar.'
      },
      {
        id: 'c2_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Tan charro! Me caes súper bien. De una, vamos por una pola y charlamos.',
        translation: 'Que simpático! Gostei de você. Com certeza, vamos tomar uma cerveja e bater papo.',
        slangTip: '"Tan charro" significa simpático/engraçado no sotaque paisa. "Pola" é cerveja.'
      }
    ],
    slangGlossary: [
      { word: 'Bacano', meaning: 'Legal, ótimo, maneiro.', example: '¡Qué fiesta tan bacana!' },
      { word: 'Una chimba', meaning: 'Algo sensacional, maravilhoso ou ótimo.', example: 'Medellín es una chimba.' },
      { word: 'Tan charro', meaning: 'Engraçado, simpático, peculiar.', example: '¡Ese tipo es tan charro!' },
      { word: 'Pola', meaning: 'Cerveja.', example: 'Compremo unas polas para la rumba.' }
    ]
  },
  {
    id: 'col_3',
    title: '3. Pedido no Restaurante Típico',
    category: 'Restaurante',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Pedindo uma deliciosa bandeja paisa com Valentina no restaurante.',
    turns: [
      {
        id: 'c3_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas! ¿Qué le podemos ofrecer hoy? Tenemos la bandeja paisa bien rica.',
        translation: 'Boa tarde! O que podemos oferecer hoje? Temos a bandeja paisa bem saborosa.',
        slangTip: '"Bien rica" significa extremamente saborosa.'
      },
      {
        id: 'c3_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, genial. Por favor, me regala una bandeja paisa bien completa.',
        translation: 'Olá, ótimo. Por favor, me vê uma bandeja paisa bem completa.',
        slangTip: 'Uso de "me regala" para pedir comida educadamente.'
      },
      {
        id: 'c3_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡De una! ¿Y de tomar? ¿Le provoca un jugo de lulo o una pola?',
        translation: 'Na hora! E de beber? Gostaria de um suco de lulo ou uma cerveja?',
        slangTip: '"Lulo" é uma fruta cítrica andina deliciosa, indispensável na Colômbia.'
      },
      {
        id: 'c3_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Prefiero un jugo de lulo bien frío, gracias. ¿Se demora mucho el plato?',
        translation: 'Prefiro um suco de lulo bem gelado, obrigado. Demora muito o prato?',
        slangTip: '"Se demora" é o termo comum para perguntar sobre tempo de espera.'
      },
      {
        id: 'c3_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'No se preocupe, eso sale de una, está volando. Siga y bien pueda, se sienta.',
        translation: 'Não se preocupe, sai na hora, está saindo rápido. Entre, fique à vontade e sente-se.',
        slangTip: '"Bien pueda" é o clássico convite colombiano para acomodar-se.'
      }
    ],
    slangGlossary: [
      { word: 'Bandeja Paisa', meaning: 'Prato nacional com arroz, feijão, chouriço, arepa, ovo, abacate.', example: 'Me comí una bandeja paisa gigante.' },
      { word: 'Lulo', meaning: 'Fruta ácida típica deliciosa dos Andes colombianos.', example: 'El jugo de lulo es re refrescante.' },
      { word: 'Bien pueda', meaning: 'Fique à vontade, sirva-se, entre.', example: 'Siga, bien pueda, la casa es suya.' }
    ]
  },
  {
    id: 'col_4',
    title: '4. Pedindo um Táxi na Rua',
    category: 'Táxi',
    location: 'Bogotá',
    dialect: 'colombia',
    description: 'Parando um táxi amarelo na agitada avenida de Bogotá.',
    turns: [
      {
        id: 'c4_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! ¿A dónde lo llevo, mi hermano? El tráfico está re pesado hoy.',
        translation: 'Olá! Para onde te levo, meu irmão? O trânsito está super pesado hoje.',
        slangTip: '"Re pesado" indica que o tráfego está caótico.'
      },
      {
        id: 'c4_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Voy para el centro histórico. ¿Me puede llevar por favor?',
        translation: 'Olá. Vou para o centro histórico. Pode me levar por favor?',
        slangTip: '"Voy para..." é a indicação clássica de destino.'
      },
      {
        id: 'c4_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, súbase. Pero le advierto que por esa vaina de la marcha nos toca dar una vuelta larga.',
        translation: 'Pronto, suba. Mas te aviso que por conta daquela coisa do protesto teremos que dar uma volta longa.',
        slangTip: '"Esa vaina" refere-se a qualquer situação de forma genérica.'
      },
      {
        id: 'c4_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'No hay problema, no llevo afán. ¿Cuánto calcula que costará el viaje?',
        translation: 'Não há problema, não estou com pressa. Quanto calcula que custará a viagem?',
        slangTip: '"No llevo afán" significa que não há pressa imediata.'
      },
      {
        id: 'c4_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Como va con taxímetro, por ahí unas quince lucas. Pilas con cerrar suave la puerta.',
        translation: 'Como vai com taxímetro, uns quinze mil pesos por aí. Cuidado para fechar suave a porta.',
        slangTip: '"Lucas" na Colômbia equivale a mil pesos. "Pilas" é fique atento.'
      }
    ],
    slangGlossary: [
      { word: 'Vaina', meaning: 'Coisa, assunto, problema ou objeto qualquer.', example: 'Pásame esa vaina que está en la mesa.' },
      { word: 'No llevar afán', meaning: 'Não estar com pressa.', example: 'Hágale tranquilo, que no llevo afán.' },
      { word: 'Lucas', meaning: 'Mil pesos colombianos (gíria monetária).', example: 'Esa pola me costó cuatro lucas.' },
      { word: 'Pilas', meaning: 'Atenção, cuidado, fique esperto.', example: '¡Pilas en el centro con el teléfono!' }
    ]
  },
  {
    id: 'col_5',
    title: '5. Noite de Rumba e Guaro',
    category: 'Balada',
    location: 'Cali',
    dialect: 'colombia',
    description: 'Saindo para rumbear e bebendo aguardente em Cali.',
    turns: [
      {
        id: 'c5_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! Qué alegría verte. Esta noche vamos a tirar paso y a tomar guaro de verdad.',
        translation: 'Olá! Que alegria te ver. Esta noite vamos dançar e tomar aguardente de verdade.',
        slangTip: '"Tirar paso" significa dançar salsa. "Guaro" é o apelido do aguardente.'
      },
      {
        id: 'c5_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Excelente! Estoy listo para bailar. ¿Compramos una media botella de aguardiente?',
        translation: 'Excelente! Estou pronto para dançar. Compramos uma meia garrafa de aguardente?',
        slangTip: '"Media botella" é o formato super comum de comprar bebidas alcóolicas na balada.'
      },
      {
        id: 'c5_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡De una! Tomamos guaro bien frío. ¿Y sí sabe bailar salsa, o le da mamera?',
        translation: 'Na hora! Tomamos aguardente bem gelado. E você sabe dançar salsa mesmo ou sente preguiça?',
        slangTip: '"Dar mamera" significa ter preguiça ou achar algo entediante.'
      },
      {
        id: 'c5_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Sé un poco, pero necesito que me enseñes algunos trucos colombianos.',
        translation: 'Sei um pouco, mas preciso que me ensine alguns truques colombianos.',
        slangTip: 'Resposta aberta e amigável para entrosamento na festa.'
      },
      {
        id: 'c5_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hágale pues! Esta noche la pasamos re bien. ¡Salud, parce!',
        translation: 'Vai em frente então! Esta noite nos divertiremos muito. Saúde, parceiro!',
        slangTip: '"Hágale pues" incentiva a ação imediata.'
      }
    ],
    slangGlossary: [
      { word: 'Guaro', meaning: 'Aguardiente (bebida alcoólica nacional anisada).', example: 'Pasame un trago de guaro.' },
      { word: 'Tirar paso', meaning: 'Dançar (especialmente salsa).', example: 'A ella le encanta tirar paso los viernes.' },
      { word: 'Mamera', meaning: 'Preguiça, tédio, chatice.', example: '¡Qué mamera lavar los platos!' }
    ]
  },
  {
    id: 'col_6',
    title: '6. Café da Manhã com Arepas',
    category: 'Cotidiano',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Tomando café da manhã na esquina da rua com Valentina.',
    turns: [
      {
        id: 'c6_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! Para empezar el día con toda, nos comemos una arepa de choclo re chusca.',
        translation: 'Olá! Para começar o dia com tudo, vamos comer uma arepa de choclo super gostosa.',
        slangTip: '"Arepa de choclo" é feita com milho doce tenro.'
      },
      {
        id: 'c6_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Hola! Suena genial, y por favor me regalas un tinto bien caliente.',
        translation: 'Olá! Soa ótimo, e por favor me vê um café preto bem quente.',
        slangTip: 'Uso perfeito de "tinto" e "me regalas" no café.'
      },
      {
        id: 'c6_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, de una. ¿Le ponemos queso derretido por encima a su arepa?',
        translation: 'Pronto, combinado. Colocamos queijo derretido por cima da sua arepa?',
        slangTip: '"Queso por encima" é o toque mestre das arepas.'
      },
      {
        id: 'c6_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Sí, claro, con mucho queso por favor. ¡Eso debe saber a gloria!',
        translation: 'Sim, claro, com bastante queijo por favor. Isso deve ter um gosto divino!',
        slangTip: '"Saber a gloria" expressa que algo é espetacularmente saboroso.'
      },
      {
        id: 'c6_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Total! Siga, siéntese bien pueda, ya le traigo su tinto caliente.',
        translation: 'Com certeza! Entre, sente-se e fique à vontade, já te trago o seu café quente.',
        slangTip: 'Acolhimento clássico com "bien pueda".'
      }
    ],
    slangGlossary: [
      { word: 'Chusco', meaning: 'Bonito, gracioso ou agradável.', example: 'El perrito de Valentina es re chusco.' },
      { word: 'Tinto', meaning: 'Café preto coado comum (pequeno e sem leite).', example: 'Tomemos un tinto bien cargado.' }
    ]
  },
  {
    id: 'col_7',
    title: '7. Problemas com a Água Quente',
    category: 'Hotel',
    location: 'Bogotá',
    dialect: 'colombia',
    description: 'Reclamando na recepção de que o chuveiro está gelado.',
    turns: [
      {
        id: 'c7_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! ¿Cómo me le va? ¿En qué le puedo colaborar el día de hoy?',
        translation: 'Olá! Como vai? Em que posso te ajudar no dia de hoje?',
        slangTip: '"Colaborar" é usado polidamente para "ajudar" ou "prestar serviço".'
      },
      {
        id: 'c7_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Qué pena molestarle, pero la ducha de mi habitación no tiene agua caliente.',
        translation: 'Desculpe incomodá-la, mas o chuveiro do meu quarto não tem água quente.',
        slangTip: '"Qué pena molestarle" é a introdução educada ideal para reclamações.'
      },
      {
        id: 'c7_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay, qué pena con usted! Esa vaina del calentador andaba fallando ayer.',
        translation: 'Ai, desculpe-me! Aquela coisa do aquecedor estava dando defeito ontem.',
        slangTip: '"Qué pena con usted" é uma forte desculpa colombiana.'
      },
      {
        id: 'c7_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'No se preocupe, entiendo. ¿Se puede solucionar hoy mismo?',
        translation: 'Não se preocupe, entendo. É possível resolver hoje mesmo?',
        slangTip: '"No se preocupe" ameniza a queixa de forma simpática.'
      },
      {
        id: 'c7_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, ya le digo al técnico. De una queda solucionado eso, quédese tranquilo.',
        translation: 'Pronto, já aviso o técnico. Isso vai ficar resolvido na hora, fique tranquilo.',
        slangTip: '"De una" denota ação instantânea.'
      }
    ],
    slangGlossary: [
      { word: 'Colaborar', meaning: 'Ajudar, prestar auxílio ou serviço.', example: '¿Me puede colaborar con la maleta?' },
      { word: 'Qué pena con usted', meaning: 'Sinto muito, peço imensas desculpas (formal/cordial).', example: 'Qué pena con usted, no tenemos mesa disponible.' }
    ]
  },
  {
    id: 'col_8',
    title: '8. Pedindo o WhatsApp',
    category: 'Flerte',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Bate-papo charmoso no final de uma tarde no Parque Lleras.',
    turns: [
      {
        id: 'c8_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'La pasé delicioso charlando contigo hoy. Eres una nota completa.',
        translation: 'Me diverti muito conversando com você hoje. Você é muito gente boa.',
        slangTip: '"Pasar delicioso" é divertir-se intensamente.'
      },
      {
        id: 'c8_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Yo también la pasé increíble. Me pareces una chimba de mujer.',
        translation: 'Eu também me diverti incrível. Te acho uma mulher maravilhosa.',
        slangTip: '"Chimba de mujer" é um elogio urbano excelente.'
      },
      {
        id: 'c8_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Tan lindo! De verdad qué buena energía tienes.',
        translation: 'Que fofo! De verdade, que energia boa você tem.',
        slangTip: '"Tan lindo" expressa doçura e agradecimento.'
      },
      {
        id: 'c8_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¿Me regalas tu número de celular para que salgamos de rumba el sábado?',
        translation: 'Me dá o número do seu celular para sairmos para dançar no sábado?',
        slangTip: '"Me regalas tu número" é a forma comum de pedir o telefone.'
      },
      {
        id: 'c8_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Listo! Apúntelo pues de una, que el sábado tiramos paso sabroso.',
        translation: 'Combinado! Anota logo aí então, que sábado a gente dança gostoso.',
        slangTip: '"Tirar paso sabroso" é curtir muito a pista de dança.'
      }
    ],
    slangGlossary: [
      { word: 'Pasar delicioso', meaning: 'Divertir-se muito, ter momentos maravilhosos.', example: 'Ayer la pasamos delicioso en el río.' },
      { word: 'Tan lindo', meaning: 'Que fofo / gentil (usado para elogios gentis).', example: '¡Tan lindo, gracias por las flores!' }
    ]
  },
  {
    id: 'col_9',
    title: '9. Negociando Preço com o Taxista',
    category: 'Táxi',
    location: 'Cartagena',
    dialect: 'colombia',
    description: 'Negociando a tarifa fixa do táxi na saída da Cidade Amuralhada.',
    turns: [
      {
        id: 'c9_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas! ¿Para dónde va, patrón? Súbase rápido que hay trancón.',
        translation: 'Boa tarde! Para onde vai, patrão? Suba rápido que tem congestionamento.',
        slangTip: '"Trancón" é o engarrafamento / congestionamento.'
      },
      {
        id: 'c9_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Voy para Bocagrande. ¿Cuánto cuesta la carrera?',
        translation: 'Olá. Vou para Bocagrande. Quanto custa a corrida?',
        slangTip: '"Carrera" é o nome dado à corrida de táxi.'
      },
      {
        id: 'c9_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'A Bocagrande le cuesta veinte lucas, es que por allá hay mucho visaje hoy.',
        translation: 'Até Bocagrande custa vinte mil pesos, é que por lá o trânsito está muito esquisito hoje.',
        slangTip: '"Visaje" aqui denota confusão ou agitação suspeita.'
      },
      {
        id: 'c9_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡No, patrón! Veinte mil es una boleta. Le ofrezco doce mil pesos.',
        translation: 'Não, chefe! Vinte mil é um abuso/mico. Te ofereço doze mil pesos.',
        slangTip: '"Boleta" expressa indignação ou que algo é exagerado/ridículo.'
      },
      {
        id: 'c9_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Déjelo en quince lucas pues y nos fuimos de una. ¿Listo?',
        translation: 'Deixe em quinze mil pesos então e vamos na hora. Combinado?',
        slangTip: 'Negociação fechada em "quince lucas" (15.000 COP).'
      }
    ],
    slangGlossary: [
      { word: 'Trancón', meaning: 'Engarrafamento, congestionamento pesado.', example: 'Me quedé atrapado en un trancón el jueves.' },
      { word: 'Carrera', meaning: 'Corrida ou trajeto de táxi/transporte.', example: '¿Cuánto me cobra por esta carrera?' }
    ]
  },
  {
    id: 'col_10',
    title: '10. Entrando na Lista VIP',
    category: 'Balada',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Conversando com Valentina, que está controlando a entrada da balada.',
    turns: [
      {
        id: 'c10_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas noches! Solo entran los parceros que están en lista. ¿Tienen reserva?',
        translation: 'Boa noite! Só entram os parceiros que estão na lista. Vocês têm reserva?',
        slangTip: '"Parceros" são os clientes/amigos.'
      },
      {
        id: 'c10_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. No tengo reserva, pero vengo con amigos y queremos pasarla bacano.',
        translation: 'Olá. Não tenho reserva, mas venho com amigos e queremos nos divertir muito.',
        slangTip: '"Pasarla bacano" expressa desejo de curtir bem.'
      },
      {
        id: 'c10_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ay, qué pena! Pero el sitio está lleno. Tocaría pagar cover de cincuenta lucas por cabeza.',
        translation: 'Ah, sinto muito! Mas o lugar está cheio. Teria que pagar entrada de 50 mil por pessoa.',
        slangTip: '"Cover" é o valor de entrada e "por cabeza" é por pessoa.'
      },
      {
        id: 'c10_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Uf! Cincuenta mil es re caro. ¿No nos puedes colaborar para entrar más barato?',
        translation: 'Nossa! Cinquenta mil é super caro. Você não pode quebrar um galho para entrarmos mais barato?',
        slangTip: 'Uso estratégico de "colaborar" para negociar cortesia.'
      },
      {
        id: 'c10_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Bueno, por ser parceros buena gente, entren por treinta lucas cada uno de una.',
        translation: 'Bem, por serem parceiros gente boa, entrem por trinta mil cada um na hora.',
        slangTip: 'Desconto fechado de forma amigável.'
      }
    ],
    slangGlossary: [
      { word: 'Por cabeza', meaning: 'Por pessoa (gíria comum para divisões ou preços).', example: 'La pizza sale a diez lucas por cabeza.' },
      { word: 'Cover', meaning: 'Taxa de entrada em baladas ou bares.', example: 'El cover incluye una pola de cortesía.' }
    ]
  },
  {
    id: 'col_11',
    title: '11. Pedindo Wi-Fi na Recepção',
    category: 'Hotel',
    location: 'Cali',
    dialect: 'colombia',
    description: 'Tentando conectar-se à internet do hostel com urgência.',
    turns: [
      {
        id: 'c11_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! ¿Cómo va todo? ¿La habitación está bien o le falta alguna vaina?',
        translation: 'Olá! Como vão as coisas? O quarto está bom ou falta alguma coisa?',
        slangTip: 'Perguntando de forma atenciosa sobre as acomodações.'
      },
      {
        id: 'c11_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, todo está excelente. Solo que no encuentro la clave del Wi-Fi.',
        translation: 'Olá, tudo está excelente. Só que não encontro a senha do Wi-Fi.',
        slangTip: '"Clave" é a palavra padrão para senha na América Latina.'
      },
      {
        id: 'c11_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Ah, obvio! Qué pena con usted, la clave está pegada detrás de la tarjeta del hostal.',
        translation: 'Ah, óbvio! Desculpe-me, a senha está colada atrás do cartão do hostel.',
        slangTip: '"Qué pena con usted" expressando cordialidade imediata.'
      },
      {
        id: 'c11_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Listo, ya la vi. Muchas gracias por la colaboración, de verdad.',
        translation: 'Pronto, já vi. Muito obrigado pela ajuda, de verdade.',
        slangTip: '"Listo" e "colaboración" fecham a conversa polidamente.'
      },
      {
        id: 'c11_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Con muchísimo gusto, mi hermano. Siga y bien pueda disfrute de la red.',
        translation: 'Com muitíssimo prazer, meu irmão. Vá em frente e aproveite a rede.',
        slangTip: '"Con mucho gusto" é a resposta acolhedora padrão colombiana.'
      }
    ],
    slangGlossary: [
      { word: 'Con muchísimo gusto', meaning: 'De nada, com o maior prazer (extremamente comum).', example: '¡Gracias por el tinto! - Con mucho gusto.' }
    ]
  },
  {
    id: 'col_12',
    title: '12. Elogiando o Sotaque',
    category: 'Flerte',
    location: 'Bogotá',
    dialect: 'colombia',
    description: 'Flertando sutilmente sobre a melodia das palavras de Valentina.',
    turns: [
      {
        id: 'c12_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Oye, me encanta escucharte hablar. Tienes un acento extranjero bien bacano.',
        translation: 'Ei, adoro te ouvir falar. Você tem um sotaque estrangeiro muito legal.',
        slangTip: 'Elogio simpático para abrir as portas da conversa.'
      },
      {
        id: 'c12_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Gracias! Pero el acento colombiano tuyo sí que es una nota, suena muy dulce.',
        translation: 'Obrigado! Mas o seu sotaque colombiano que é maravilhoso, soa muito doce.',
        slangTip: '"Es una nota" elogiando a musicalidade do dialeto.'
      },
      {
        id: 'c12_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Tan lindo! De verdad qué piropo tan chévere. Me sonrojas, parce.',
        translation: 'Que fofo! De verdade, que galanteio tão legal. Você me deixa vermelha, parceiro.',
        slangTip: '"Piropo" significa cantada, elogio ou galanteio.'
      },
      {
        id: 'c12_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'No é mentira, es la verdad. ¿Qué tal si celebramos con un café caliente?',
        translation: 'Não é mentira, é a verdade. Que tal se comemorarmos com um café quente?',
        slangTip: 'Proposta charmosa para prolongar o papo.'
      },
      {
        id: 'c12_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡De una! Vamos por un tinto o un capuchino delicioso y seguimos echando carreta.',
        translation: 'Com certeza! Vamos tomar um café preto ou um capuchinho delicioso e continuar batendo papo.',
        slangTip: '"Echar carreta" para indicar conversa descontraída.'
      }
    ],
    slangGlossary: [
      { word: 'Piropo', meaning: 'Cantada, elogio cortês, galanteio na rua.', example: 'Me dio un piropo hermoso sobre mis ojos.' },
      { word: 'Echar carreta', meaning: 'Conversar, contar causos, bater papo descontraído.', example: 'Nos quedamos echando carreta hasta la medianoche.' }
    ]
  },
  {
    id: 'col_13',
    title: '13. Comprando Arepas na Esquina',
    category: 'Cotidiano',
    location: 'Cartagena',
    dialect: 'colombia',
    description: 'Comprando arepas fritas de ovo com um vendedor de rua local.',
    turns: [
      {
        id: 'c13_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Buenas, mi hermano! ¿Le provoca probar la arepa de huevo cartagenera, bien rica?',
        translation: 'Boa tarde, meu irmão! Gostaria de provar a arepa de ovo cartagenera, extremamente saborosa?',
        slangTip: 'Gíria de comércio informal e simpática.'
      },
      {
        id: 'c13_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, de una, quiero probar esa delicia. ¿A cómo tiene cada una?',
        translation: 'Olá. Sim, com certeza, quero provar essa delícia. Quanto custa cada uma?',
        slangTip: '"¿A cómo tiene...?" para perguntar preços na rua.'
      },
      {
        id: 'c13_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Le sale a cinco lucas. Se la entrego calientica con su respectivo ají dulce.',
        translation: 'Sai por cinco mil pesos. Te entrego quentinha com o seu respectivo molho de pimenta doce.',
        slangTip: '"Ají" é o molho de pimenta tradicional na Colômbia.'
      },
      {
        id: 'c13_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Excelente. Me regala dos arepas de huevo, por favor. Aquí tiene el dinero.',
        translation: 'Excelente. Me vê duas arepas de ovo, por favor. Aqui está o dinheiro.',
        slangTip: 'Uso de "me regala" para fazer a compra na rua.'
      },
      {
        id: 'c13_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Listo, mi llave! Siga bien pueda y disfrute. Que tenga un día bien bacano.',
        translation: 'Pronto, meu parceiro! Fique à vontade e aproveite. Que tenha um dia muito legal!',
        slangTip: '"Mi llave" é a gíria caribenha para "parceiro/amigo".'
      }
    ],
    slangGlossary: [
      { word: 'Mi llave', meaning: 'Parceiro, amigo (gíria muito forte no Caribe colombiano).', example: '¿Qué más, mi llave? ¿Todo bien?' },
      { word: 'Ají', meaning: 'Molho de pimenta (geralmente caseiro com coentro e cebola).', example: 'Échale bastante ají a la empanada.' }
    ]
  },
  {
    id: 'col_14',
    title: '14. Fazendo um Tour na Comuna 13',
    category: 'Cotidiano',
    location: 'Medellín',
    dialect: 'colombia',
    description: 'Fazendo um tour guiado de grafite e história com Valentina nas escadarias.',
    turns: [
      {
        id: 'c14_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola, parcero! Qué emoción hacer este tour contigo. La Comuna trece tiene una berraquera increíble.',
        translation: 'Olá, parceiro! Que emoção fazer este tour com você. A Comuna 13 tem uma força/energia incrível.',
        slangTip: '"Berraquera" expressando garra e superação histórica.'
      },
      {
        id: 'c14_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, Valentina. Estoy muy emocionado. Los grafitis se ven espectaculares y llenos de color.',
        translation: 'Olá, Valentina. Estou muito emocionado. Os grafites parecem espetaculares e cheios de cor.',
        slangTip: 'Frase que expressa admiração artística.'
      },
      {
        id: 'c14_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Sí, de una! Son historias de resiliencia. ¿Y si nos subimos por las escaleras eléctricas bien bacanas?',
        translation: 'Sim, com certeza! São histórias de resiliência. E se subirmos pelas escadas rolantes super legais?',
        slangTip: '"Escaleras eléctricas" são os famosos acessos modernos da comunidade.'
      },
      {
        id: 'c14_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Claro que sí! Quiero tomar muchas fotos de las vistas de Medellín desde arriba.',
        translation: 'Claro que sim! Quero tirar muitas fotos das vistas de Medellín lá de cima.',
        slangTip: 'Interação focada em fotografia e turismo.'
      },
      {
        id: 'c14_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, camine pues y le enseño los mejores grafitis del barrio. Esto es una nota.',
        translation: 'Pronto, ande logo então e te mostro os melhores grafites do bairro. Isso é sensacional.',
        slangTip: '"Camine pues" incentiva a caminhar.'
      }
    ],
    slangGlossary: [
      { word: 'Berraquera', meaning: 'Força, superação, garra ou excelência extrema.', example: 'La transformación de la Comuna es una berraquera.' },
      { word: 'Camine pues', meaning: 'Ande logo, vamos caminhar então.', example: 'Camine pues que se nos hace tarde.' }
    ]
  },
  {
    id: 'col_15',
    title: '15. Comprando uma Passagem de Ônibus',
    category: 'Cotidiano',
    location: 'Bogotá',
    dialect: 'colombia',
    description: 'No Terminal de Transportes tentando comprar passagem para Villa de Leyva.',
    turns: [
      {
        id: 'c15_1',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Hola! ¿Para dónde viaja hoy? La taquilla para Boyacá está de una libre.',
        translation: 'Olá! Para onde viaja hoje? A bilheteria para Boyacá está totalmente livre.',
        slangTip: '"De una libre" significa vazia, sem filas.'
      },
      {
        id: 'c15_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Quiero comprar un pasaje de autobús para ir a Villa de Leyva.',
        translation: 'Olá. Quero comprar uma passagem de ônibus para ir a Villa de Leyva.',
        slangTip: 'Indicação clara de compra de transporte rodoviário.'
      },
      {
        id: 'c15_3',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: 'Listo, el pasaje le cuesta treinta lucas. El bus sale en veinte minutos de afán.',
        translation: 'Pronto, a passagem te custa trinta mil pesos. O ônibus sai em vinte minutos bem rápido.',
        slangTip: '"Salir de afán" indica partida iminente / pressa.'
      },
      {
        id: 'c15_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Perfecto. Me regalas un boleto, por favor. Aquí tiene las treinta lucas.',
        translation: 'Perfeito. Me vê um bilhete, por favor. Aqui estão os trinta mil pesos.',
        slangTip: 'Uso de "me regalas" e "lucas" para finalizar o pagamento.'
      },
      {
        id: 'c15_5',
        speaker: 'Valentina',
        isUserTurn: false,
        spanish: '¡Excelente! Pilas con abordar en la plataforma cuatro. ¡Buen viaje, parce!',
        translation: 'Excelente! Fique ligado para embarcar na plataforma quatro. Boa viagem, parceiro!',
        slangTip: '"Pilas con" recomendando atenção máxima.'
      }
    ],
    slangGlossary: [
      { word: 'Afán', meaning: 'Pressa, urgência.', example: 'Tengo afán de llegar a la cita.' }
    ]
  },

  // MEXICO (Conversations 16-30)
  {
    id: 'mex_16',
    title: '16. Registro no Hotel em Reforma',
    category: 'Hotel',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Você acaba de chegar ao hotel e fala com Diego na recepção.',
    turns: [
      {
        id: 'c16_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Hola, qué tal! Bienvenido a la Ciudad de México. ¿Cómo andas, carnal?',
        translation: 'Olá, que tal! Bem-vindo à Cidade do México. Como você está, meu irmão?',
        slangTip: '"Carnal" é o tratamento mexicano caloroso para amigos ou pessoas próximas.'
      },
      {
        id: 'c16_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, muy bien, gracias. Tengo una reserva a nombre de Juan.',
        translation: 'Olá, muito bem, obrigado. Tenho uma reserva em nome de Juan.',
        slangTip: 'Check-in direto e padrão para iniciar.'
      },
      {
        id: 'c16_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Súper! Dame un segundito para checar en la computadora. ¿Me das tu identificación, por fa?',
        translation: 'Excelente! Me dá um segundinho para checar no computador. Me dá sua identificação, por favor?',
        slangTip: '"Checar" é o verbo mexicano importado do inglês para checar/verificar.'
      },
      {
        id: 'c16_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Claro que sí, aquí tienes. Espero que todo esté en orden con mi cuarto.',
        translation: 'Claro que sim, aqui está. Espero que tudo esteja em ordem com meu quarto.',
        slangTip: '"En orden" para indicar organização e correção.'
      },
      {
        id: 'c16_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Ya estás, jefe! Tu habitación quedó lista. Es la trescientos dos. Que la pases chido.',
        translation: 'Fechado, chefe! Seu quarto ficou pronto. É o 302. Divirta-se muito.',
        slangTip: '"¡Ya estás!" significa combinado/fechado. "Pasar chido" é curtir muito.'
      }
    ],
    slangGlossary: [
      { word: 'Carnal', meaning: 'Irmão, amigo muito próximo do peito.', example: 'Hola carnal, ¿vamos por unos tacos?' },
      { word: 'Checar', meaning: 'Verificar, checar, examinar.', example: 'Déjame checar si hay boletos.' },
      { word: '¡Ya estás!', meaning: 'Fechado, combinado, tudo certo!', example: '¿Nos vemos a las ocho? ¡Ya estás!' },
      { word: 'Chido', meaning: 'Legal, bacana, bonito, agradável.', example: 'Tu carro nuevo está bien chido.' }
    ]
  },
  {
    id: 'mex_17',
    title: '17. Paquerando na Condesa',
    category: 'Flerte',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Conversando de forma charmosa com Diego na linda praça da Condesa.',
    turns: [
      {
        id: 'c17_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Hola! Te vi medio despistado con el mapa. ¿Buscas algún lugar padre para cenar?',
        translation: 'Olá! Te vi meio perdido com o mapa. Está procurando algum lugar legal para jantar?',
        slangTip: '"Lugar padre" significa um lugar bem legal / bacana.'
      },
      {
        id: 'c17_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, busco una cantina tranquila con buena música. ¿Conoces alguna?',
        translation: 'Olá. Sim, procuro um bar tranquilo com música boa. Você conhece algum?',
        slangTip: '"Cantina" no México é o bar tradicional com bebidas e petiscos.'
      },
      {
        id: 'c17_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Huy, obvio! Aquí cerquita hay una cantina padrísima. Las botanas están bien chidas.',
        translation: 'Nossa, óbvio! Aqui pertinho tem um bar fantástico. Os petiscos são maravilhosos.',
        slangTip: '"Padrísima" é o superlativo de padre (muito legal). "Botanas" são os aperitivos.'
      },
      {
        id: 'c17_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Suena excelente. ¿Y no te gustaría acompañarme a tomar una cerveza de favor?',
        translation: 'Soa excelente. E você não gostaria de me acompanhar para tomar uma cerveja, por favor?',
        slangTip: '"De favor" é um pedido polido típico mexicano.'
      },
      {
        id: 'c17_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Órale, qué buena onda! De volada vamos por una chela bien muerta y platicamos.',
        translation: 'Nossa, que legal! Rapidinho vamos tomar uma cerveja estupidamente gelada e conversar.',
        slangTip: '"Órale" expressa aceitação entusiasmada. "Chela bien muerta" é cerveja trincando.'
      }
    ],
    slangGlossary: [
      { word: 'Padre', meaning: 'Legal, bom, formidável (gíria mexicana tradicional).', example: 'La película estuvo muy padre.' },
      { word: 'Botanas', meaning: 'Petiscos, salgadinhos ou aperitivos servidos em bares.', example: 'Trae unas botanas para el partido.' },
      { word: 'Órale', meaning: 'Caramba, uau, vamos lá, sim (exclamação versátil).', example: '¡Órale, qué rápido llegaste!' },
      { word: 'Chela bien muerta', meaning: 'Cerveja extremamente gelada, no ponto.', example: 'Mesero, tráiganos una chela bien muerta.' }
    ]
  },
  {
    id: 'mex_18',
    title: '18. Pedindo Tacos al Pastor',
    category: 'Restaurante',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Fazendo um pedido em uma taquería de calçada tradicional.',
    turns: [
      {
        id: 'c18_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Qué onda, güey! ¿Qué te ando sirviendo? Te recomiendo los al pastor con piña.',
        translation: 'E aí, cara! O que vou te servindo? Te recomendo os tacos al pastor com abacaxi.',
        slangTip: '"Güey" é o chamamento informal mexicano.'
      },
      {
        id: 'c18_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Por favor, me das cuatro tacos al pastor con todo, bien calientes.',
        translation: 'Olá. Por favor, me dá quatro tacos al pastor completos, bem quentes.',
        slangTip: '"Con todo" significa com cebola picada, coentro e abacaxi.'
      },
      {
        id: 'c18_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Sale! ¿Y de tomar? ¿Te late un refresco de vidrio o una chela helada?',
        translation: 'Fechado! E de beber? Topa um refrigerante de garrafa de vidro ou uma cerveja gelada?',
        slangTip: '"¿Te late?" significa "você topa?" ou "gostaria?".'
      },
      {
        id: 'c18_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Prefiero una chela bien fría, por favor. ¿La salsa roja pica mucho?',
        translation: 'Prefiro uma cerveja bem gelada, por favor. O molho vermelho arde muito?',
        slangTip: '"Picar" para referir-se à ardência das pimentas (salsas).'
      },
      {
        id: 'c18_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'Pica un buen, güey, ¡aguas con ponerle de más! Te los preparo de volada.',
        translation: 'Arde para caramba, cara, cuidado para não colocar demais! Preparo num instante.',
        slangTip: '"¡Aguas!" é o grito de cuidado mexicano. "Picar un buen" indica ardência severa.'
      }
    ],
    slangGlossary: [
      { word: 'Güey', meaning: 'Cara, mano, brother (a gíria mexicana número um).', example: '¿Qué haces, güey?' },
      { word: '¿Te late?', meaning: 'Você topa? Gostaria? Acha uma boa ideia?', example: '¿Te late si vamos al cine hoy?' },
      { word: '¡Aguas!', meaning: 'Atenção, cuidado, fique esperto!', example: '¡Aguas con el escalón!' },
      { word: 'Picar un buen', meaning: 'Arder bastante / ser extremamente picante.', example: 'Esa salsa verde pica un buen.' }
    ]
  },
  {
    id: 'mex_19',
    title: '19. Pegando um Táxi na Rua',
    category: 'Táxi',
    location: 'Guadalajara',
    dialect: 'mexico',
    description: 'Parando um carro na saída do Mercado Libertad para ir ao centro.',
    turns: [
      {
        id: 'c19_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Hola, jefe! ¿A dónde lo llevo? Traigo prisa porque el tráfico está pesado.',
        translation: 'Olá, chefe! Para onde te levo? Estou com um pouco de pressa porque o trânsito está pesado.',
        slangTip: '"Jefe" é um tratamento amigável e cortês na rua.'
      },
      {
        id: 'c19_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Voy para la Catedral Central. ¿Me puede llevar por favor?',
        translation: 'Olá. Vou para a Catedral Central. Pode me levar por favor?',
        slangTip: 'Indicação simples de rota.'
      },
      {
        id: 'c19_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Híjole, güey! Por ahí cerraron calles, nos toca dar una vuelta enorme marca diablo.',
        translation: 'Nossa, cara! Fecharam ruas por ali, teremos que dar uma volta enorme absurda.',
        slangTip: '"Marca diablo" é usado para intensificar grandemente algo ("absurda/terrível").'
      },
      {
        id: 'c19_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'No te preocupes, no tengo mucha prisa. ¿En cuánto sale la corrida?',
        translation: 'Não se preocupe, não tenho muita pressa. Em quanto sai a corrida?',
        slangTip: '"¿En cuánto sale?" é a forma de perguntar preços no México.'
      },
      {
        id: 'c19_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'Como ando sin taxímetro, te cobro cien varos cerrados. Súbete de volada.',
        translation: 'Como estou sem taxímetro, te cobro cem pesos fechados. Suba rapidinho.',
        slangTip: '"Varos" significa pesos mexicanos.'
      }
    ],
    slangGlossary: [
      { word: 'Híjole', meaning: 'Puxa vida, caramba, uau (indica surpresa ou contrariedade).', example: '¡Híjole! Olvidé mis llaves.' },
      { word: 'Marca diablo', meaning: 'Absurdo, extremo, exagerado, fortíssimo.', example: 'Hace un frío marca diablo hoy.' },
      { word: 'Varos', meaning: 'Pesos mexicanos, moedas, grana.', example: 'Preéstame veinte varos para el refresco.' }
    ]
  },
  {
    id: 'mex_20',
    title: '20. Noite de Tequila e Mariachi',
    category: 'Balada',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Reunindo-se na Praça Garibaldi para ouvir mariachis e beber tequila.',
    turns: [
      {
        id: 'c20_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Qué milagro verte! Esta noche vamos a cantar rancheras y a echar desmadre con tequila.',
        translation: 'Que milagre te ver! Esta noite vamos cantar músicas rancheiras e bagunçar com tequila.',
        slangTip: '"Qué milagro" expressa surpresa feliz ao rever alguém.'
      },
      {
        id: 'c20_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Excelente! Estoy listo para festejar. ¿Compramos una botella de tequila reposado?',
        translation: 'Excelente! Estou pronto para festejar. Compramos uma garrafa de tequila reposada?',
        slangTip: '"Tequila reposado" é envelhecido e extremamente macio.'
      },
      {
        id: 'c20_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Órale! Pero derechito, sin refresco. ¿Y sí aguantas el picante o te da hueva comer salsa?',
        translation: 'Uau! Mas pura, sem refrigerante. E você aguenta pimenta mesmo ou tem preguiça de comer molho?',
        slangTip: '"Derechito" significa beber tequila pura, sem misturas.'
      },
      {
        id: 'c20_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Aguanto todo! Ponle la salsa que quieras, soy como um mexicano más.',
        translation: 'Aguento tudo! Coloque o molho que quiser, sou como mais um mexicano.',
        slangTip: 'Frase que ganha simpatia dos locais pelo apreço à pimenta.'
      },
      {
        id: 'c20_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡No manches, eres de los míos! La vamos a pasar de pocas madres hoy. ¡Salud!',
        translation: 'Não brinca, você é dos meus! Vamos nos divertir pra caramba hoje. Saúde!',
        slangTip: '"De pocas madres" indica que será maravilhoso/perfeito.'
      }
    ],
    slangGlossary: [
      { word: 'Qué milagro', meaning: 'Que milagre! (usado ao reencontrar alguém após muito tempo).', example: '¡Qué milagro, güey! Pensé que estabas de viaje.' },
      { word: 'Echar desmadre', meaning: 'Fazer bagunça alegre, zoar, festejar intensamente.', example: 'Fuimos a la playa a echar desmadre.' },
      { word: 'De pocas madres', meaning: 'Incrível, excelente, maravilhoso (gíria forte).', example: 'El concierto de ayer estuvo de pocas madres.' }
    ]
  },
  {
    id: 'mex_21',
    title: '21. Chilaquiles no Café da Manhã',
    category: 'Cotidiano',
    location: 'Monterrey',
    dialect: 'mexico',
    description: 'Pedindo chilaquiles picantes para curar a ressaca.',
    turns: [
      {
        id: 'c21_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Buenos días! Te ves bien crudo, güey. Te urge un plato de chilaquiles con frijolitos.',
        translation: 'Bom dia! Você parece super ressacado, cara. Te urge um prato de chilaquiles com feijõezinhos.',
        slangTip: '"Crudo" é a ressaca típica de quem exagerou na bebida.'
      },
      {
        id: 'c21_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, la verdad estoy cansadísimo. Los chilaquiles verdes suenan perfectos.',
        translation: 'Olá. Sim, a verdade é que estou cansadíssimo. Os chilaquiles verdes parecem perfeitos.',
        slangTip: '"Chilaquiles verdes" levam molho azedo de tomatillo picante.'
      },
      {
        id: 'c21_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Va! ¿Los quieres con pollo o huevo estrellado? Y ponte trucha con el chile habanero.',
        translation: 'Fechado! Quer com frango ou ovo frito? E fica esperto com a pimenta habanero.',
        slangTip: '"Ponte trucha" significa fica esperto/atento.'
      },
      {
        id: 'c21_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Con pollo y huevo por favor. Y sin mucha pimenta habanero, que todavía sufro.',
        translation: 'Com frango e ovo por favor. E sem muita pimenta habanero, porque ainda estou sofrendo.',
        slangTip: 'Pedindo moderação na pimenta pela manhã.'
      },
      {
        id: 'c21_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Sale! De volada te los traigo bien chidos para que te levantes de una vez, carnal.',
        translation: 'Fechado! Rapidinho te trago bem gostosos para você levantar de uma vez, irmão.',
        slangTip: '"De volada" para ação instantânea.'
      }
    ],
    slangGlossary: [
      { word: 'Crudo', meaning: 'Ressacado (termo mexicano essencial para o pós-festa).', example: 'Estoy bien crudo, no quiero luz.' },
      { word: 'Ponte trucha', meaning: 'Fique esperto, fique ligado, preste atenção.', example: 'Ponte trucha con tus bolsas en el metro.' }
    ]
  },
  {
    id: 'mex_22',
    title: '22. Chuveiro sem Água Quente',
    category: 'Hotel',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Reclamando na recepção de que o chuveiro está gelado.',
    turns: [
      {
        id: 'c22_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Hola, qué tal! ¿Todo chido con tu habitación, o necesitas alguna cosa?',
        translation: 'Olá, que tal! Tudo legal com o seu quarto ou você precisa de alguma coisa?',
        slangTip: '"Todo chido" perguntando se está tudo bem.'
      },
      {
        id: 'c22_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, disculpa. Es que me quise bañar y la regadera no tiene agua caliente.',
        translation: 'Olá, desculpe. É que quis tomar banho e o chuveiro não tem água quente.',
        slangTip: '"Regadera" é a palavra oficial e única no México para chuveiro.'
      },
      {
        id: 'c22_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Híjole! Qué chafa con el calentador, ayer andaba fallando en todo este piso.',
        translation: 'Nossa! Que porcaria com o aquecedor, ontem estava dando defeito em todo este andar.',
        slangTip: '"Chafa" indica má qualidade ou falha de sistema.'
      },
      {
        id: 'c22_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'No te preocupes, suele pasar. ¿Me puedes ayudar a solucionarlo por favor?',
        translation: 'Não se preocupe, costuma acontecer. Pode me ajudar a resolver isso por favor?',
        slangTip: 'Formulação educada e direta para reparo.'
      },
      {
        id: 'c22_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Claro, güey! De volada mando al técnico para que lo deje bien chido. Disculpa.',
        translation: 'Claro, cara! Rapidinho mando o técnico para deixá-lo excelente. Desculpe.',
        slangTip: '"De volada" indica assistência imediata.'
      }
    ],
    slangGlossary: [
      { word: 'Regadera', meaning: 'Chuveiro (no México não se diz "ducha" comumente).', example: 'La regadera gotea un buen.' },
      { word: 'Chafa', meaning: 'De má qualidade, ruim, com defeito ou fajuto.', example: 'Esos tenis salieron bien chafas.' }
    ]
  },
  {
    id: 'mex_23',
    title: '23. Pedindo o Instagram',
    category: 'Flerte',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Flertando amigavelmente no final da tarde perto do Palácio de Bellas Artes.',
    turns: [
      {
        id: 'c23_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'La neta me la pasé súper padre platicando contigo. Tienes muy bonita vibra.',
        translation: 'A verdade é que me diverti muito conversando com você. Você tem uma vibe muito bonita.',
        slangTip: '"La neta" significa "a verdade", "sinceramente".'
      },
      {
        id: 'c23_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Muchas gracias. Tú también eres un chavo súper buena onda y muy divertido.',
        translation: 'Muito obrigado. Você também é um garoto super gente boa e muito divertido.',
        slangTip: '"Chavo" é o rapaz mexicano.'
      },
      {
        id: 'c23_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Ay, qué chulo! Me vas a hacer sonrojar aquí en plena calle, güey.',
        translation: 'Ah, que fofo! Vai me fazer ficar vermelho aqui no meio da rua, cara.',
        slangTip: '"Qué chulo" expressando fofura.'
      },
      {
        id: 'c23_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¿Me pasas tu Instagram para que estemos en contacto y salgamos el viernes?',
        translation: 'Me passa o seu Instagram para mantermos contato e sairmos na sexta?',
        slangTip: '"¿Me pasas tu...?" é a pergunta perfeita de conexão.'
      },
      {
        id: 'c23_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Órale, de volada! Búscame así y el viernes armamos un desmadre chido.',
        translation: 'Claro, na hora! Me busca assim e na sexta a gente arma uma festa legal.',
        slangTip: '"Armar un desmadre chido" planejar curtição massa.'
      }
    ],
    slangGlossary: [
      { word: 'La neta', meaning: 'A verdade, sinceramente, real (extremamente comum).', example: 'La neta no quiero ir hoy.' },
      { word: 'Chavo', meaning: 'Garoto, rapaz, jovem (do clássico Chavo del Ocho).', example: 'Ese chavo corre bien rápido.' }
    ]
  },
  {
    id: 'mex_24',
    title: '24. Negociando Táxi do Aeroporto',
    category: 'Táxi',
    location: 'Cancun',
    dialect: 'mexico',
    description: 'Saindo do terminal e pegando transporte até a zona hoteleira.',
    turns: [
      {
        id: 'c24_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Hola! ¿A la zona hotelera, patrón? Súbase que hace un calorón marca diablo.',
        translation: 'Olá! À zona hoteleira, patrão? Suba que faz um calorão absurdo.',
        slangTip: '"Calorón marca diablo" expressando o mormaço da praia.'
      },
      {
        id: 'c24_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, voy para allá. ¿En cuánto sale el viaje de favor?',
        translation: 'Olá. Sim, vou para lá. Quanto custa a viagem, por favor?',
        slangTip: '"¿En cuánto sale...?" para tarifas.'
      },
      {
        id: 'c24_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'Le sale en ochocientos pesos, es que la gasolina está carísima.',
        translation: 'Sai em oitocentos pesos, é que a gasolina está caríssima.',
        slangTip: 'Tarifas inflacionadas de turismo.'
      },
      {
        id: 'c24_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡No mames, güey! Ochocientos pesos es un robo. Te ofrezco quinientos varos.',
        translation: 'Não brinca, cara! Oitocentos pesos é um roubo. Te ofereço quinhentos pesos.',
        slangTip: '"No mames" expressando choque severo. "Varos" para pesos.'
      },
      {
        id: 'c24_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Órale pues, déjalo en seiscientos varos y ya nos fuimos de volada!',
        translation: 'Beleza então, deixa em seiscentos pesos e já vamos rapidinho!',
        slangTip: 'Trato fechado no valor intermediário.'
      }
    ],
    slangGlossary: [
      { word: 'No mames', meaning: 'Puta merda, caramba, de jeito nenhum (choque extremo, gíria de rua).', example: '¡No mames! Se me cayó el celular.' }
    ]
  },
  {
    id: 'mex_25',
    title: '25. Entrando no Antro da Moda',
    category: 'Balada',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Negociando com Diego, o segurança controlador da entrada do antro.',
    turns: [
      {
        id: 'c25_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Buenas noches! Hoy solo pasan con reservación chida. Está llenísimo el antro.',
        translation: 'Boa noite! Hoje só entram com reserva boa. A balada está cheia demais.',
        slangTip: '"Antro" é o termo mexicano exclusivo para balada/boate.'
      },
      {
        id: 'c25_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. No tengo reserva, pero queremos entrar y pasar una noche padrísima.',
        translation: 'Olá. Não tenho reserva, mas queremos entrar e passar uma noite excelente.',
        slangTip: '"Padrísima" expressando desejo de se divertir muito.'
      },
      {
        id: 'c25_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Híjole! Está difícil sin reservación. El cover hoy está en quinientos pesos por cabeza.',
        translation: 'Caramba! Está difícil sem reserva. A entrada hoje está em quinhentos pesos por pessoa.',
        slangTip: '"Híjole" para contrariedade. "Por cabeza" para pessoas.'
      },
      {
        id: 'c25_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡No te pases, carnal! Eso es demasiado varo. ¿No me das chance con descuento?',
        translation: 'Não abusa, irmão! Isso é muito dinheiro. Não me dá uma chance com desconto?',
        slangTip: '"No te pases" pedindo moderação no valor.'
      },
      {
        id: 'c25_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'Va, por caer bien, pasen por trescientos pesos cada quien de volada.',
        translation: 'Fechado, por serem gente boa, entrem por trezentos pesos cada um rapidinho.',
        slangTip: 'Desconto amigável concedido.'
      }
    ],
    slangGlossary: [
      { word: 'Antro', meaning: 'Boate, discoteca, balada noturna.', example: 'Ese antro tiene buena música electrónica.' },
      { word: 'No te pases', meaning: 'Não abuse, não exagere, vá devagar.', example: '¡No te pases con la sal!' }
    ]
  },
  {
    id: 'mex_26',
    title: '26. Pedindo Wi-Fi na Cantina',
    category: 'Cotidiano',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Sentado no bar com Diego tentando obter conexão de dados com urgência.',
    turns: [
      {
        id: 'c26_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Qué onda, güey! ¿Todo chido con tu cerveza, o te traigo otra botana?',
        translation: 'E aí, cara! Tudo legal com a sua cerveja ou te trago outro petisco?',
        slangTip: 'Atendimento atencioso do mesero mexicano.'
      },
      {
        id: 'c26_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, todo excelente. Oye, disculpa, ¿cuál es la contraseña del Wi-Fi de favor?',
        translation: 'Olá, tudo excelente. Ei, desculpe, qual é a senha do Wi-Fi por favor?',
        slangTip: '"Contraseña" é muito usada para senhas.'
      },
      {
        id: 'c26_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Huy, claro! La contraseña está escrita en el pizarrón detrás de la barra principal.',
        translation: 'Ah, claro! A senha está escrita na lousa atrás do balcão principal.',
        slangTip: '"Pizarrón" é o quadro negro ou lousa.'
      },
      {
        id: 'c26_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Ah, perfecto, ya la vi. Te lo agradezco mucho, carnal.',
        translation: 'Ah, perfeito, já vi. Te agradeço muito, irmão.',
        slangTip: 'Fechamento com amizade com "carnal".'
      },
      {
        id: 'c26_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡De qué, carnal! Disfruta la red y si quieres otra chela, me avisas de volada.',
        translation: 'De nada, irmão! Aproveite a rede e se quiser outra cerveja, me avisa rapidinho.',
        slangTip: '"De qué" significa de nada / por nada.'
      }
    ],
    slangGlossary: [
      { word: 'Contraseña', meaning: 'Senha de internet ou acessos.', example: 'Pásame la contraseña de tu celular.' },
      { word: 'De qué', meaning: 'De nada / Por nada (cortesia rápida mexicana).', example: '¡Muchas gracias por la ayuda! - ¿De qué, carnal?' }
    ]
  },
  {
    id: 'mex_27',
    title: '27. Fazendo um Tour em Teotihuacán',
    category: 'Cotidiano',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Explorando as pirâmides do Sol e da Lua em um tour com Diego.',
    turns: [
      {
        id: 'c27_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Órale, carnal! Qué padre hacer este tour contigo hoy. Teotihuacán es majestuoso.',
        translation: 'Uau, irmão! Que legal fazer este tour com você hoje. Teotihuacán é majestoso.',
        slangTip: '"¡Órale!" expressando admiração ou ânimo.'
      },
      {
        id: 'c27_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola, Diego. Sí, estoy impresionado con el tamaño de las pirámides. ¡Se ven increíbles!',
        translation: 'Olá, Diego. Sim, estou impressionado com o tamanho das pirâmides. Parecem incríveis!',
        slangTip: 'Expressão de maravilhamento com as construções mesoamericanas.'
      },
      {
        id: 'c27_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Y espérate a subir a la cima! ¿Nos aventamos la Pirámide del Sol de volada?',
        translation: 'E espera até subir ao topo! Vamos encarar a Pirâmide do Sol rapidinho?',
        slangTip: '"Aventarse" na gíria mexicana significa encarar um desafio ou arriscar-se.'
      },
      {
        id: 'c27_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Claro, vamos! Quiero cargarme de buena energía arqueológica mexicana.',
        translation: 'Claro, vamos! Quero me carregar de energia arqueológica mexicana positiva.',
        slangTip: 'Alusão à famosa tradição mística de carregar energia nas pirâmides.'
      },
      {
        id: 'c27_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Eso es todo! Ponte trucha con las piedras resbalosas. ¡Súbele pues, carnal!',
        translation: 'É isso aí! Fique esperto com as pedras escorregadias. Sobe aí então, irmão!',
        slangTip: '"Ponte trucha" recomendando foco na subida.'
      }
    ],
    slangGlossary: [
      { word: 'Aventarse', meaning: 'Encarar um desafio, decidir-se a fazer algo ousado.', example: 'Me aventé a viajar solo por México.' },
      { word: 'Zócalo', meaning: 'Praça central histórica da capital.', example: 'El Zócalo de la CDMX es inmenso.' }
    ]
  },
  {
    id: 'mex_28',
    title: '28. Pegando um Voo no Aeroporto',
    category: 'Cotidiano',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'No Aeroporto Benito Juárez com Diego despachando sua bagagem de viagem.',
    turns: [
      {
        id: 'c28_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Hola! ¿Viajas hoy con equipaje de mano o documentas maleta grande, carnal?',
        translation: 'Olá! Viaja hoje com bagagem de mão ou despacha mala grande, irmão?',
        slangTip: '"Documentar" é a expressão técnica usada para despachar bagagem no aeroporto.'
      },
      {
        id: 'c28_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, tengo que documentar esta maleta grande. Espero que no tenga sobrepeso.',
        translation: 'Olá. Sim, tenho que despachar esta mala grande. Espero que não esteja com excesso de peso.',
        slangTip: '"Documentar" incorporado perfeitamente no check-in do voo.'
      },
      {
        id: 'c28_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'A ver, ponla en la báscula de volada. Pesa veintidós kilos, quedó al límite chido.',
        translation: 'Vejamos, coloque-a na balança rapidinho. Pesa vinte e dois quilos, ficou no limite de boa.',
        slangTip: '"Báscula" é a balança.'
      },
      {
        id: 'c28_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Huf, qué alivio! ¿A qué hora empieza el abordaje y por cuál sala debo entrar?',
        translation: 'Nossa, que alívio! A que horas começa o embarque e por qual sala (portão) devo entrar?',
        slangTip: '"Sala" é o termo comum para portão de embarque no aeroporto.'
      },
      {
        id: 'c28_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'El abordaje es a las tres. Te toca la sala de espera B. ¡Buen vuelo, carnal!',
        translation: 'O embarque é às três. Te toca a sala de espera B. Boa viagem, irmão!',
        slangTip: '"Te toca" significa "é a sua vez" ou "cabe a você".'
      }
    ],
    slangGlossary: [
      { word: 'Documentar', meaning: 'Despachar bagagem no aeroporto.', example: 'Tengo que documentar dos maletas en el mostrador.' },
      { word: 'Te toca', meaning: 'É a sua vez / Cabe a você / Lhe corresponde.', example: 'Te toca pagar las chelas hoy.' }
    ]
  },
  {
    id: 'mex_29',
    title: '29. Comprando Passagem de Ônibus',
    category: 'Cotidiano',
    location: 'Puebla',
    dialect: 'mexico',
    description: 'No terminal rodoviário CAPU tentando comprar passagem para Oaxaca.',
    turns: [
      {
        id: 'c29_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Buenas! ¿A qué destino viaja hoy, jefe? Los autobuses de primera salen bien chidos.',
        translation: 'Boa tarde! Para qual destino viaja hoje, chefe? Os ônibus de primeira classe saem bem confortáveis.',
        slangTip: 'Atendimento prestativo na bilheteria.'
      },
      {
        id: 'c29_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Quiero comprar un boleto de autobús para ir a Oaxaca hoy por la tarde.',
        translation: 'Olá. Quero comprar uma passagem de ônibus para ir a Oaxaca hoje à tarde.',
        slangTip: '"Boleto" é o termo unânime para passagens ou ingressos no México.'
      },
      {
        id: 'c29_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Sale! El boleto le cuesta cuatrocientos varos en el servicio expreso de volada.',
        translation: 'Fechado! A passagem te custa quatrocentos pesos no serviço expresso rápido.',
        slangTip: '"Sale" expressando confirmação imediata.'
      },
      {
        id: 'c29_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Perfecto. Me da un boleto, por favor. Pago en efectivo. Aquí tiene.',
        translation: 'Perfeito. Me dá uma passagem, por favor. Pago em dinheiro. Aqui está.',
        slangTip: '"Efectivo" para notas de dinheiro físico.'
      },
      {
        id: 'c29_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Ya estás, carnal! Tu autobús sale del andén cinco en diez minutos. ¡Aguas con perderlo!',
        translation: 'Fechado, irmão! Seu ônibus sai da plataforma cinco em dez minutos. Cuidado para não perdê-lo!',
        slangTip: '"¡Aguas con!" alertando para perigo de atraso.'
      }
    ],
    slangGlossary: [
      { word: 'Boleto', meaning: 'Ingresso, passagem de ônibus/trem/metrô.', example: 'Compré un boleto de avión re barato.' },
      { word: 'Sale', meaning: 'Fechado, combinado, ok (gíria mexicana de aceitação).', example: '¿Vamos a comer tacos? ¡Sale!' }
    ]
  },
  {
    id: 'mex_30',
    title: '30. Conversando com o Vendedor de Tacos de Canasta',
    category: 'Cotidiano',
    location: 'Cidade do México',
    dialect: 'mexico',
    description: 'Comprando tacos de canasta super baratos com um vendedor ambulante de bicicleta.',
    turns: [
      {
        id: 'c30_1',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Qué onda, patrón! ¿De qué le ando dando? Tengo de papa, chicharrón y frijolitos re chidos.',
        translation: 'E aí, patrão! De qual sabor vai querer? Tenho de batata, torresmo e feijão super gostosos.',
        slangTip: '"Tacos de canasta" são tacos cozidos no vapor carregados em cestas de vime cobertas.'
      },
      {
        id: 'c30_2',
        speaker: 'Você',
        isUserTurn: true,
        spanish: 'Hola. Sí, quiero probarlos de verdad. ¿En cuánto sale cada taquito?',
        translation: 'Olá. Sim, quero prová-los de verdade. Em quanto sai cada taquinho?',
        slangTip: '"¿En quanto sale?" perguntando preço de forma natural.'
      },
      {
        id: 'c30_3',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: 'A diez varitos cada uno, güey. Te los sirvo con su buena cebolla y salsa verde cruda.',
        translation: 'A dez pesinhos cada um, cara. Te sirvo com bastante cebola e molho verde cru.',
        slangTip: '"Varito" diminutivo carinhoso para pesos.'
      },
      {
        id: 'c30_4',
        speaker: 'Você',
        isUserTurn: true,
        spanish: '¡Excelente! Me da dos de chicharrón y tres de papa por favor. Aquí tiene.',
        translation: 'Excelente! Me dá dois de torresmo e três de batata por favor. Aqui está.',
        slangTip: 'Pedido sob medida delicioso.'
      },
      {
        id: 'c30_5',
        speaker: 'Diego',
        isUserTurn: false,
        spanish: '¡Ya estás, jefe! Cómaselos calientitos. ¡Que le aproveche y le queden bien chidos!',
        translation: 'Fechado, chefe! Coma-os quentinhos. Bom proveito e que te façam super bem!',
        slangTip: '"Que le aproveche" desejando bom proveito.'
      }
    ],
    slangGlossary: [
      { word: 'Tacos de canasta', meaning: 'Tacos de calçada cozidos no vapor de batata, feijão ou chicharrón.', example: 'Los tacos de canasta salvan mi almuerzo.' },
      { word: 'Que le aproveche', meaning: 'Bom proveito (muito usado ao servir comida).', example: 'Buen provecho, que le aproveche.' }
    ]
  }
];
