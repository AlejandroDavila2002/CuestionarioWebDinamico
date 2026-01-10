const questions = [
  // --- Parte 1: El Huerto y el Arresto ---
  {
    question: '¿Dónde está Jesús rezando al principio de la película?',
    answers: [
      { text: 'En el templo', correct: false },
      { text: 'En un huerto de noche', correct: true },
      { text: 'En el desierto', correct: false },
      { text: 'En casa de Pilato', correct: false }
    ]
  },
  {
    question: '¿Qué les pide Jesús a sus amigos (apóstoles) que hagan mientras él reza?',
    answers: [
      { text: 'Que preparen la cena', correct: false },
      { text: 'Que vayan a buscar a Judas', correct: false },
      { text: 'Que se queden despiertos y vigilen', correct: true },
      { text: 'Que se escondan de los soldados', correct: false }
    ]
  },
  {
    question: '¿Qué hacían sus amigos cuando Jesús vuelve de rezar?',
    answers: [
      { text: 'Estaban durmiendo', correct: true },
      { text: 'Estaban discutiendo', correct: false },
      { text: 'Estaban comiendo', correct: false },
      { text: 'Estaban rezando también', correct: false }
    ]
  },
  {
    question: '¿Quién aparece para tentar a Jesús en el huerto?',
    answers: [
      { text: 'Un soldado romano', correct: false },
      { text: 'Caifás', correct: false },
      { text: 'Una figura pálida (Satanás)', correct: true },
      { text: 'Judas', correct: false }
    ]
  },
  {
    question: '¿Qué animal aplasta Jesús con el pie en el huerto?',
    answers: [
      { text: 'Un escorpión', correct: false },
      { text: 'Una araña', correct: false },
      { text: 'Un ratón', correct: false },
      { text: 'Una serpiente', correct: true }
    ]
  },
  {
    question: '¿Quién es el apóstol que traiciona a Jesús con un beso?',
    answers: [
      { text: 'Pedro', correct: false },
      { text: 'Judas', correct: true },
      { text: 'Juan', correct: false },
      { text: 'Malco', correct: false }
    ]
  },
  {
    question: '¿Qué le dan los guardias del templo a Judas a cambio de Jesús?',
    answers: [
      { text: 'Un título de propiedad', correct: false },
      { text: 'Ropa nueva', correct: false },
      { text: 'Una bolsa de monedas de plata', correct: true },
      { text: 'Un caballo', correct: false }
    ]
  },
  {
    question: '¿Qué apóstol saca una espada para defender a Jesús?',
    answers: [
      { text: 'Pedro', correct: true },
      { text: 'Juan', correct: false },
      { text: 'Mateo', correct: false },
      { text: 'Judas', correct: false }
    ]
  },
  {
    question: '¿A quién le corta la oreja Pedro?',
    answers: [
      { text: 'A un soldado romano', correct: false },
      { text: 'A Malco, un siervo del templo', correct: true },
      { text: 'A Judas', correct: false },
      { text: 'A Caifás', correct: false }
    ]
  },
  {
    question: '¿Qué hace Jesús con la oreja cortada de Malco?',
    answers: [
      { text: 'La pisa y la destruye', correct: false },
      { text: 'La ignora y sigue caminando', correct: false },
      { text: 'Se la da a Pedro', correct: false },
      { text: 'La recoge del suelo y lo cura', correct: true }
    ]
  },
  {
    question: '¿Qué hacen casi todos los apóstoles cuando arrestan a Jesús?',
    answers: [
      { text: 'Salen corriendo y huyen', correct: true },
      { text: 'Intentan sobornar a los guardias', correct: false },
      { text: 'Empiezan a pelear con palos', correct: false },
      { text: 'Se arrodillan y piden piedad', correct: false }
    ]
  },
  {
    question: '¿Qué le pasa a Judas después, cuando intenta devolver el dinero?',
    answers: [
      { text: 'Los sacerdotes lo perdonan', correct: false },
      { text: 'Los sacerdotes no lo aceptan y él tira el dinero', correct: true },
      { text: 'Los soldados lo arrestan a él también', correct: false },
      { text: 'Se gasta el dinero en comida', correct: false }
    ]
  },

  // --- Parte 2: Los Juicios ---
  {
    question: '¿Quién es el apóstol que sigue a Jesús de lejos hasta el patio del templo?',
    answers: [
      { text: 'Judas', correct: false },
      { text: 'Pedro', correct: true },
      { text: 'Mateo', correct: false },
      { text: 'Tomás', correct: false }
    ]
  },
  {
    question: '¿Cuántas veces dice Pedro que no conoce a Jesús?',
    answers: [
      { text: 'Una vez', correct: false },
      { text: 'Dos veces', correct: false },
      { text: 'Tres veces', correct: true },
      { text: 'Nunca lo niega', correct: false }
    ]
  },
  {
    question: '¿Qué animal canta justo después de que Pedro niega a Jesús?',
    answers: [
      { text: 'Una lechuza', correct: false },
      { text: 'Un perro', correct: false },
      { text: 'Un gallo', correct: true },
      { text: 'Una paloma', correct: false }
    ]
  },
  {
    question: '¿Qué hace Pedro cuando se da cuenta de que negó a Jesús?',
    answers: [
      { text: 'Huye y llora desconsoladamente', correct: true },
      { text: 'Saca su espada para pelear', correct: false },
      { text: 'Entra a defender a Jesús', correct: false },
      { text: 'Se esconde y se duerme', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama el sumo sacerdote que interroga a Jesús?',
    answers: [
      { text: 'Pilato', correct: false },
      { text: 'Herodes', correct: false },
      { text: 'Anás', correct: false },
      { text: 'Caifás', correct: true }
    ]
  },
  {
    question: '¿De qué acusan los sacerdotes a Jesús?',
    answers: [
      { text: 'De robar dinero del templo', correct: false },
      { text: 'De no pagar impuestos a Roma', correct: false },
      { text: 'De llamarse a sí mismo "Hijo de Dios"', correct: true },
      { text: 'De practicar brujería', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama el gobernador romano al que llevan a Jesús?',
    answers: [
      { text: 'Poncio Pilato', correct: true },
      { text: 'César', correct: false },
      { text: 'Herodes', correct: false },
      { text: 'Caifás', correct: false }
    ]
  },
  {
    question: '¿Pilato cree que Jesús es culpable al principio?',
    answers: [
      { text: 'Sí, quiere crucificarlo inmediatamente', correct: false },
      { text: 'No, le dice a los sacerdotes que él no encuentra culpa', correct: true },
      { text: 'No sabe y pide ayuda a los soldados', correct: false },
      { text: 'Cree que está loco, pero no que es culpable', correct: false }
    ]
  },
  {
    question: '¿Qué le dice la esposa de Pilato a su esposo sobre Jesús?',
    answers: [
      { text: 'Le pide que lo libere porque es popular', correct: false },
      { text: 'Le advierte que no le haga nada a ese hombre justo', correct: true },
      { text: 'Le dice que lo crucifique rápido', correct: false },
      { text: 'Le pide conocer a Jesús en persona', correct: false }
    ]
  },
  {
    question: '¿A qué otro rey envía Pilato a Jesús?',
    answers: [
      { text: 'Al Rey Herodes', correct: true },
      { text: 'Al César en Roma', correct: false },
      { text: 'Al Rey de Egipto', correct: false },
      { text: 'Al Rey David', correct: false }
    ]
  },
  {
    question: '¿Qué hace Herodes cuando ve a Jesús?',
    answers: [
      { text: 'Lo azota inmediatamente', correct: false },
      { text: 'Se burla de él y le pide un milagro', correct: true },
      { text: 'Le pide perdón y lo libera', correct: false },
      { text: 'Lo acusa de traición', correct: false }
    ]
  },
  {
    question: '¿A qué prisionero famoso le ofrece Pilato a la gente liberar?',
    answers: [
      { text: 'A Simón de Cirene', correct: false },
      { text: 'A Judas', correct: false },
      { text: 'A Gestas, el ladrón', correct: false },
      { text: 'A Barrabás', correct: true }
    ]
  },
  {
    question: '¿A quién elige la gente para que sea liberado?',
    answers: [
      { text: 'A Jesús', correct: false },
      { text: 'A Barrabás', correct: true },
      { text: 'A ninguno de los dos', correct: false },
      { text: 'A un soldado romano', correct: false }
    ]
  },

  // --- Parte 3: El Castigo y la Vía Crucis ---
  {
    question: '¿Qué castigo ordena Pilato para Jesús pensando que eso calmaría a la gente?',
    answers: [
      { text: 'Que lo azoten (la flagelación)', correct: true },
      { text: 'Que lo encierren 10 años', correct: false },
      { text: 'Que lo destierren de la ciudad', correct: false },
      { text: 'Que pague una multa al templo', correct: false }
    ]
  },
  {
    question: '¿Qué le ponen a Jesús en la cabeza para burlarse de él?',
    answers: [
      { text: 'Un casco de soldado', correct: false },
      { text: 'Una corona hecha de espinas', correct: true },
      { text: 'Un sombrero de paja', correct: false },
      { text: 'Una bolsa de tela', correct: false }
    ]
  },
  {
    question: '¿De qué color es la capa (manto) que le ponen para burlarse?',
    answers: [
      { text: 'Blanca', correct: false },
      { text: 'Negra', correct: false },
      { text: 'Morada (o púrpura)', correct: true },
      { text: 'Verde', correct: false }
    ]
  },
  {
    question: '¿Qué le grita la gente a Pilato cuando les muestra a Jesús todo golpeado?',
    answers: [
      { text: '¡Libéralo!', correct: false },
      { text: '¡Dale agua!', correct: false },
      { text: '¡Crucifícalo!', correct: true },
      { text: '¡Llévalo a Herodes!', correct: false }
    ]
  },
  {
    question: '¿Qué hace Pilato con sus manos para mostrar que no es su responsabilidad?',
    answers: [
      { text: 'Se lava las manos con agua', correct: true },
      { text: 'Levanta las manos al cielo', correct: false },
      { text: 'Aplaude a los soldados', correct: false },
      { text: 'Firma un documento', correct: false }
    ]
  },
  {
    question: '¿Qué objeto pesado tiene que cargar Jesús hasta el lugar de la crucifixión?',
    answers: [
      { text: 'Un saco de piedras', correct: false },
      { text: 'La cruz', correct: true },
      { text: 'Un poste de madera', correct: false },
      { text: 'El trono de Pilato', correct: false }
    ]
  },
  {
    question: '¿Qué hacen los soldados romanos con Jesús mientras carga la cruz?',
    answers: [
      { text: 'Lo ignoran y lo dejan solo', correct: false },
      { text: 'Le dan agua para que resista', correct: false },
      { text: 'Lo golpean, patean e insultan', correct: true },
      { text: 'Le quitan peso de la cruz', correct: false }
    ]
  },
  {
    question: '¿Qué mujer le limpia el rostro a Jesús con un paño?',
    answers: [
      { text: 'María Magdalena', correct: false },
      { text: 'La esposa de Pilato', correct: false },
      { text: 'Verónica', correct: true },
      { text: 'Su madre María', correct: false }
    ]
  },
  {
    question: '¿Qué se queda marcado en el paño de Verónica?',
    answers: [
      { text: 'El rostro de Jesús', correct: true },
      { text: 'Sangre sin forma', correct: false },
      { text: 'Las manos de Jesús', correct: false },
      { text: 'El logo del águila romana', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama el hombre que es obligado por los soldados a ayudar a Jesús?',
    answers: [
      { text: 'Barrabás', correct: false },
      { text: 'Malco', correct: false },
      { text: 'Simón de Cirene', correct: true },
      { text: 'Nicodemo', correct: false }
    ]
  },
  {
    question: '¿Simón de Cirene quería ayudar al principio?',
    answers: [
      { text: 'Sí, se ofreció voluntariamente', correct: false },
      { text: 'No, los soldados lo agarraron a la fuerza', correct: true },
      { text: 'Sí, era un discípulo secreto', correct: false },
      { text: 'No, pero le pagaron para hacerlo', correct: false }
    ]
  },
  {
    question: '¿Qué le grita Simón a los soldados cuando ve cómo tratan a Jesús?',
    answers: [
      { text: 'Les pide que lo maten rápido', correct: false },
      { text: 'Les pregunta cuánto le van a pagar', correct: false },
      { text: 'Les grita que dejen de golpearlo', correct: true },
      { text: 'Les pide que lo suelten a él', correct: false }
    ]
  },
  {
    question: '¿Qué hacen unas mujeres cuando ven pasar a Jesús?',
    answers: [
      { text: 'Se ríen y se burlan de él', correct: false },
      { text: 'Le tiran piedras', correct: false },
      { text: 'Se esconden por miedo', correct: false },
      { text: 'Lloran por él', correct: true }
    ]
  },
  {
    question: '¿Quiénes siguen a Jesús en todo el camino a la cruz?',
    answers: [
      { text: 'Su madre María, María Magdalena y Juan', correct: true },
      { text: 'Pedro y los demás apóstoles', correct: false },
      { text: 'Pilato y su esposa', correct: false },
      { text: 'Caifás y los sacerdotes', correct: false }
    ]
  },
  {
    question: '¿Qué se ve en un *flashback* (recuerdo) cuando Jesús se cae con la cruz?',
    answers: [
      { text: 'A Jesús de niño cayéndose, y a María corriendo a levantarlo', correct: true },
      { text: 'A Jesús caminando sobre el agua', correct: false },
      { text: 'A Jesús multiplicando los panes', correct: false },
      { text: 'A Jesús naciendo en el pesebre', correct: false }
    ]
  },
  {
    question: '¿Qué hace María, la madre de Jesús, en el suelo después de que lo azotan?',
    answers: [
      { text: 'Reza en voz alta', correct: false },
      { text: 'Se desmaya', correct: false },
      { text: 'Limpia la sangre de su hijo con unos paños', correct: true },
      { text: 'Le grita a los soldados', correct: false }
    ]
  },
  {
    question: '¿Qué lleva Satanás en brazos mientras Jesús es azotado?',
    answers: [
      { text: 'Una serpiente', correct: false },
      { text: 'Un bebé de aspecto extraño y demoníaco', correct: true },
      { text: 'Una bolsa de monedas', correct: false },
      { text: 'Una corona de espinas', correct: false }
    ]
  },
  {
    question: '¿Qué hacen los soldados con la ropa (túnica) de Jesús antes de crucificarlo?',
    answers: [
      { text: 'Se la juegan a los dados', correct: true },
      { text: 'La queman', correct: false },
      { text: 'Se la devuelven a María', correct: false },
      { text: 'La rompen en pedazos', correct: false }
    ]
  },
  {
    question: '¿Dónde clavan a Jesús?',
    answers: [
      { text: 'En sus muñecas y tobillos', correct: false },
      { text: 'Solo en sus manos', correct: false },
      { text: 'En sus manos y en sus pies', correct: true },
      { text: 'En sus hombros y rodillas', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama el lugar donde lo crucifican?',
    answers: [
      { text: 'Getsemaní', correct: false },
      { text: 'Gólgota (Lugar de la Calavera)', correct: true },
      { text: 'El Templo', correct: false },
      { text: 'El patio de Pilato', correct: false }
    ]
  },

  // --- Parte 4: La Crucifixión ---
  {
    question: '¿Cuántas personas son crucificadas junto a Jesús?',
    answers: [
      { text: 'Ninguna, está solo', correct: false },
      { text: 'Una (Barrabás)', correct: false },
      { text: 'Otras dos (dos ladrones)', correct: true },
      { text: 'Otros cuatro ladrones', correct: false }
    ]
  },
  {
    question: '¿Qué decía el letrero que pusieron arriba de la cruz de Jesús?',
    answers: [
      { text: '"INRI" (Jesús de Nazaret, Rey de los Judíos)', correct: true },
      { text: '"Traicionó a Roma"', correct: false },
      { text: '"Este es un blasfemo"', correct: false },
      { text: '"Aquí yace el profeta"', correct: false }
    ]
  },
  {
    question: '¿Quién pidió que pusieran ese letrero?',
    answers: [
      { text: 'Caifás', correct: false },
      { text: 'Pilato', correct: true },
      { text: 'La madre de Jesús', correct: false },
      { text: 'Herodes', correct: false }
    ]
  },
  {
    question: '¿El "mal ladrón" (Gestas) se arrepiente?',
    answers: [
      { text: 'Sí, y pide perdón primero', correct: false },
      { text: 'Se queda callado toda la película', correct: false },
      { text: 'No, se burla de Jesús y lo insulta', correct: true },
      { text: 'Intenta escapar de la cruz', correct: false }
    ]
  },
  {
    question: '¿Qué le pide el "buen ladrón" (Dimas) a Jesús?',
    answers: [
      { text: 'Le pide agua', correct: false },
      { text: 'Le pide que se baje de la cruz', correct: false },
      { text: 'Le pide que se acuerde de él cuando esté en su reino', correct: true },
      { text: 'Le pide que maldiga a los soldados', correct: false }
    ]
  },
  {
    question: '¿Qué le responde Jesús al "buen ladrón"?',
    answers: [
      { text: '"Hoy estarás conmigo en el paraíso"', correct: true },
      { text: '"Tu fe te ha salvado"', correct: false },
      { text: '"No puedo ayudarte ahora"', correct: false },
      { text: '"Debes arrepentirte más"', correct: false }
    ]
  },
  {
    question: '¿Qué le dice Jesús a su madre María desde la cruz?',
    answers: [
      { text: '"No llores por mí"', correct: false },
      { text: '"Mujer, he ahí a tu hijo" (refiriéndose a Juan)', correct: true },
      { text: '"Todo estará bien"', correct: false },
      { text: '"He fracasado"', correct: false }
    ]
  },
  {
    question: '¿Qué le dice Jesús a Juan desde la cruz?',
    answers: [
      { text: '"Cuida de los demás apóstoles"', correct: false },
      { text: '"Escribe todo lo que has visto"', correct: false },
      { text: '"He ahí a tu madre"', correct: true },
      { text: '"Bájame de esta cruz"', correct: false }
    ]
  },
  {
    question: '¿Qué animal se ve molestando al "mal ladrón" en la cruz?',
    answers: [
      { text: 'Un cuervo', correct: true },
      { text: 'Una serpiente', correct: false },
      { text: 'Un perro salvaje', correct: false },
      { text: 'Un demonio', correct: false }
    ]
  },
  {
    question: '¿Qué le dan a Jesús cuando dice "Tengo sed"?',
    answers: [
      { text: 'Agua fresca', correct: false },
      { text: 'Vino dulce', correct: false },
      { text: 'Una esponja mojada en vinagre', correct: true },
      { text: 'Leche', correct: false }
    ]
  },
  {
    question: '¿Qué pasa en la naturaleza (el cielo y la tierra) cuando Jesús muere?',
    answers: [
      { text: 'El cielo se oscurece y hay un gran terremoto', correct: true },
      { text: 'Sale el sol brillantemente', correct: false },
      { text: 'Empieza a nevar', correct: false },
      { text: 'No pasa nada', correct: false }
    ]
  },
  {
    question: '¿Qué se rompe en el Templo de Jerusalén en ese momento?',
    answers: [
      { text: 'Las puertas principales', correct: false },
      { text: 'La gran cortina (el velo) se rasga en dos', correct: true },
      { text: 'El altar de sacrificios', correct: false },
      { text: 'Las ventanas del templo', correct: false }
    ]
  },
  {
    question: '¿Qué le clava un soldado romano a Jesús en el costado?',
    answers: [
      { text: 'Una espada', correct: false },
      { text: 'Una flecha', correct: false },
      { text: 'Una lanza', correct: true },
      { text: 'Un cuchillo', correct: false }
    ]
  },
  {
    question: '¿Qué sale del costado de Jesús?',
    answers: [
      { text: 'Solo sangre', correct: false },
      { text: 'Solo agua', correct: false },
      { text: 'Sangre y agua', correct: true },
      { text: 'No sale nada', correct: false }
    ]
  },
  {
    question: '¿Qué hacen los soldados con los otros dos crucificados?',
    answers: [
      { text: 'Los bajan vivos', correct: false },
      { text: 'Les rompen las piernas', correct: true },
      { text: 'Les clavan lanzas también', correct: false },
      { text: 'Los dejan allí toda la noche', correct: false }
    ]
  },

  // --- Parte 5: Los Recuerdos (Flashbacks) ---
  {
    question: 'En el recuerdo de la Última Cena, ¿qué parte Jesús?',
    answers: [
      { text: 'El pescado', correct: false },
      { text: 'El pan', correct: true },
      { text: 'Una fruta', correct: false },
      { text: 'Un trozo de carne', correct: false }
    ]
  },
  {
    question: '¿Qué dice Jesús sobre el pan en ese recuerdo?',
    answers: [
      { text: '"Coman todos de él"', correct: false },
      { text: '"Este es mi cuerpo"', correct: true },
      { text: '"El pan de vida"', correct: false },
      { text: '"Nunca más tendrán hambre"', correct: false }
    ]
  },
  {
    question: '¿Qué dice Jesús sobre el vino en ese recuerdo?',
    answers: [
      { text: '"Beban con alegría"', correct: false },
      { text: '"El vino de la fiesta"', correct: false },
      { text: '"Esta es mi sangre"', correct: true },
      { text: '"No beban demasiado"', correct: false }
    ]
  },
  {
    question: 'En un recuerdo, ¿qué trabajo tenía Jesús?',
    answers: [
      { text: 'Era carpintero', correct: true },
      { text: 'Era pescador', correct: false },
      { text: 'Era pastor de ovejas', correct: false },
      { text: 'Era cobrador de impuestos', correct: false }
    ]
  },
  {
    question: '¿Qué estaba construyendo Jesús en el recuerdo donde bromea con su madre?',
    answers: [
      { text: 'Una silla', correct: false },
      { text: 'Una mesa alta', correct: true },
      { text: 'Un barco pequeño', correct: false },
      { text: 'Una cuna', correct: false }
    ]
  },
  {
    question: 'En el recuerdo del Sermón de la Montaña, ¿qué enseñanza da Jesús?',
    answers: [
      { text: 'Que hay que ser ricos', correct: false },
      { text: 'Que hay que odiar a los romanos', correct: false },
      { text: 'Que hay que amar a los enemigos', correct: true },
      { text: 'Que hay que ayunar siempre', correct: false }
    ]
  },
  {
    question: '¿Qué le dice Jesús a Pedro en un recuerdo para que no tenga miedo?',
    answers: [
      { text: 'Que él es el camino, la verdad y la vida', correct: true },
      { text: 'Que los soldados no les harán daño', correct: false },
      { text: 'Que deben esconderse', correct: false },
      { text: 'Que Pedro es el más fuerte', correct: false }
    ]
  },
  {
    question: '¿Qué recuerdo tiene Jesús de cuando lavó los pies de sus apóstoles?',
    answers: [
      { text: 'Recuerda cuando le lavó los pies a Judas', correct: false },
      { text: 'Recuerda cuando le lavó los pies a Pedro', correct: true },
      { text: 'Recuerda que se negaron', correct: false },
      { text: 'Recuerda que su madre lo ayudó', correct: false }
    ]
  },
  {
    question: '¿Qué le pregunta Pilato a Jesús?',
    answers: [
      { text: '¿Tienes un ejército?', correct: false },
      { text: '¿Por qué te odian los sacerdotes?', correct: false },
      { text: '¿Qué es la verdad?', correct: true },
      { text: '¿Puedes hacer un milagro?', correct: false }
    ]
  },
  {
    question: '¿Qué recuerda Jesús que le dijo a sus apóstoles sobre el mundo?',
    answers: [
      { text: 'Que el mundo los amará', correct: false },
      { text: 'Que el mundo los odiará a ellos como lo odió a él', correct: true },
      { text: 'Que deben conquistar el mundo', correct: false },
      { text: 'Que deben huir del mundo', correct: false }
    ]
  },

  // --- Parte 6: El Final de la Película ---
  {
    question: '¿Qué cae del cielo (simbólicamente) justo cuando Jesús muere?',
    answers: [
      { text: 'Una pluma', correct: false },
      { text: 'Fuego', correct: false },
      { text: 'Una sola lágrima', correct: true },
      { text: 'Un rayo sobre el templo', correct: false }
    ]
  },
  {
    question: '¿Qué le pasa a Satanás en ese mismo momento?',
    answers: [
      { text: 'La película lo muestra gritando de rabia, derrotado', correct: true },
      { text: 'Se ríe victoriosamente', correct: false },
      { text: 'Desaparece en una nube de humo', correct: false },
      { text: 'Se transforma en serpiente', correct: false }
    ]
  },
  {
    question: '¿Quiénes bajan el cuerpo de Jesús de la cruz?',
    answers: [
      { text: 'Los soldados romanos', correct: false },
      { text: 'Sus amigos (Juan, José de Arimatea) y su madre', correct: true },
      { text: 'Pilato y sus siervos', correct: false },
      { text: 'Caifás y los sacerdotes', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama la escena famosa donde María sostiene el cuerpo muerto de Jesús?',
    answers: [
      { text: 'La Piedad', correct: true },
      { text: 'La Última Cena', correct: false },
      { text: 'El Descendimiento', correct: false },
      { text: 'La Ascensión', correct: false }
    ]
  },
  {
    question: '¿Dónde ponen el cuerpo de Jesús?',
    answers: [
      { text: 'En una fosa común', correct: false },
      { text: 'En una tumba o sepulcro', correct: true },
      { text: 'Lo dejan al pie de la cruz', correct: false },
      { text: 'Lo queman', correct: false }
    ]
  },
  {
    question: '¿Qué ponen en la entrada de la tumba?',
    answers: [
      { text: 'Una puerta de madera', correct: false },
      { text: 'Guardias romanos', correct: false },
      { text: 'Una piedra redonda muy grande', correct: true },
      { text: 'Una cruz de madera', correct: false }
    ]
  },
  {
    question: 'En la última escena, ¿cómo está la tumba?',
    answers: [
      { text: 'Está sellada y con guardias', correct: false },
      { text: 'Está derrumbada por el terremoto', correct: false },
      { text: 'Está abierta, pero el cuerpo sigue allí', correct: false },
      { text: 'La piedra está movida y la tumba está vacía', correct: true }
    ]
  },
  {
    question: '¿A quién vemos sentado dentro de la tumba?',
    answers: [
      { text: 'A un ángel', correct: false },
      { text: 'A Jesús, resucitado', correct: true },
      { text: 'A María Magdalena', correct: false },
      { text: 'A un soldado romano', correct: false }
    ]
  },
  {
    question: '¿Cómo se ve Jesús cuando se levanta?',
    answers: [
      { text: 'Se ve débil y herido', correct: false },
      { text: 'Se ve sano y en paz, con una túnica blanca', correct: true },
      { text: 'Se ve como un fantasma brillante', correct: false },
      { text: 'La película no muestra su rostro', correct: false }
    ]
  },
  {
    question: '¿Qué se ve claramente en las manos de Jesús al final?',
    answers: [
      { text: 'Sus manos están completamente sanadas', correct: false },
      { text: 'Las marcas de los clavos, pero limpias', correct: true },
      { text: 'Sus manos todavía están sangrando', correct: false },
      { text: 'Sus manos sostienen una luz brillante', correct: false }
    ]
  }
];