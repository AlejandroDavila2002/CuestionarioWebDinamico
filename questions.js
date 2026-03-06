const questions = [
  {
    question: '¿Cómo se llama la hija mayor de la familia Beam?',
    answers: [
      { text: 'Adelynn', correct: false },
      { text: 'Anna', correct: false },
      { text: 'Abbie', correct: true },
      { text: 'Haley', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama la hija menor de la familia?',
    answers: [
      { text: 'Anna', correct: false },
      { text: 'Abbie', correct: false },
      { text: 'Adelynn', correct: true },
      { text: 'Angela', correct: false }
    ]
  },
  {
    question: '¿Qué edad tiene Anna cuando comienzan los fuertes dolores de su enfermedad incurable?',
    answers: [
      { text: '7 años', correct: false },
      { text: '10 años', correct: true },
      { text: '12 años', correct: false },
      { text: '14 años', correct: false }
    ]
  },
  {
    question: 'En las primeras escenas de la granja, ¿con qué tipo de animales trabaja principalmente el padre, Kevin?',
    answers: [
      { text: 'Perros y gatos', correct: false },
      { text: 'Animales de granja grandes como vacas y cerdos', correct: true },
      { text: 'Aves exóticas', correct: false },
      { text: 'Caballos de carreras', correct: false }
    ]
  },
  {
    question: '¿En qué gran proyecto invirtió Kevin todos sus ahorros, lo cual genera tensión económica en la familia?',
    answers: [
      { text: 'En la compra de un nuevo tractor', correct: false },
      { text: 'En la construcción de una nueva casa', correct: false },
      { text: 'En abrir una clínica veterinaria propia', correct: true },
      { text: 'En un negocio de bienes raíces', correct: false }
    ]
  },
  {
    question: 'En uno de las primeras reflexiones de la iglesia, el Pastor Scott compara la fe con dos objetos cotidianos, ¿cuáles son?',
    answers: [
      { text: 'Un escudo y una espada', correct: false },
      { text: 'Un paraguas y un casco', correct: true },
      { text: 'Un ancla y un bote', correct: false },
      { text: 'Una linterna y un mapa', correct: false }
    ]
  },
  {
    question: '¿En qué momento del día experimentó Anna el peor episodio de dolor que obligó a sus padres a llevarla a urgencias?',
    answers: [
      { text: 'A media mañana en la escuela', correct: false },
      { text: 'Al mediodía después de almorzar', correct: false },
      { text: 'En el medio de la noche, despertándola de su sueño', correct: true },
      { text: 'Al atardecer mientras jugaba', correct: false }
    ]
  },
  {
    question: '¿Cuál fue el primer diagnóstico erróneo que los médicos le dieron a Anna creyendo que no era nada grave?',
    answers: [
      { text: 'Intolerancia a la lactosa y reflujo', correct: true },
      { text: 'Apendicitis aguda', correct: false },
      { text: 'Una simple gripe estomacal', correct: false },
      { text: 'Alergia al gluten', correct: false }
    ]
  },
  {
    question: '¿Qué le exige Christy al médico de emergencias en Texas, negándose a salir del hospital?',
    answers: [
      { text: 'Que le recete calmantes fuertes para el dolor', correct: false },
      { text: 'Que le reembolse el dinero de la consulta', correct: false },
      { text: 'Que traiga a otro especialista y le hagan estudios profundos', correct: true },
      { text: 'Que le den una habitación privada inmediatamente', correct: false }
    ]
  },
  {
    question: 'En urgencias, ¿qué doloroso procedimiento le realizan a Anna introduciéndolo por la nariz para salvarle la vida?',
    answers: [
      { text: 'Una biopsia pulmonar', correct: false },
      { text: 'Una endoscopia con cámara', correct: false },
      { text: 'Un tubo de succión para despejar su estómago obstruido', correct: true },
      { text: 'La alimentación forzada con líquidos', correct: false }
    ]
  },
  {
    question: '¿Qué síntoma físico muy notorio sufría Anna a causa de su incapacidad para procesar los alimentos?',
    answers: [
      { text: 'Pérdida total del cabello', correct: false },
      { text: 'Un abdomen masivamente inflamado y distendido', correct: true },
      { text: 'Manchas rojas severas por toda la piel', correct: false },
      { text: 'Ceguera temporal', correct: false }
    ]
  },
  {
    question: 'A lo largo del tratamiento de su enfermedad, ¿cuántos medicamentos diarios llegó a tomar Anna aproximadamente?',
    answers: [
      { text: '2 medicamentos', correct: false },
      { text: 'Cerca de 10 medicamentos diferentes', correct: true },
      { text: 'Más de 30 medicamentos', correct: false },
      { text: 'Ninguno, solo usaba sonda', correct: false }
    ]
  },
  {
    question: 'Durante la etapa más dura de la enfermedad en casa, ¿qué le regala Kevin a Anna para intentar levantarle el ánimo?',
    answers: [
      { text: 'Un cachorro rescatado', correct: true },
      { text: 'Un pez de colores', correct: false },
      { text: 'Una muñeca de porcelana', correct: false },
      { text: 'Un viaje a la playa', correct: false }
    ]
  },
  {
    question: '¿Quién se queja inicialmente por la restricción de comida en la casa debido a la dieta de Anna?',
    answers: [
      { text: 'Su hermana menor, Adelynn.', correct: true },
      { text: 'Su hermana mayor, Abbie.', correct: false },
      { text: 'La propia Anna.', correct: false },
      { text: 'Su padre, Kevin.', correct: false }
    ]
  },
  {
    question: '¿Por qué las mujeres de la iglesia ofenden a Christy, provocando que ella deje de asistir a los servicios?',
    answers: [
      { text: 'Por insinuar que la familia no dona suficiente dinero', correct: false },
      { text: 'Por sugerir que la enfermedad de Anna es castigo por un pecado oculto o falta de fe', correct: true },
      { text: 'Por decir que Christy es una mala madre', correct: false },
      { text: 'Por quejarse de que Anna hace mucho ruido', correct: false }
    ]
  },
  {
    question: '¿Qué actitud muestra Christy frente a la enfermedad de su hija que genera tensión con su esposo Kevin?',
    answers: [
      { text: 'Se aferra a su falta de fe', correct: true },
      { text: 'Se rinde y abandona la lucha', correct: false },
      { text: 'Se enoja y culpa a Kevin por no haberla llevado al médico antes', correct: false },
      { text: 'Niega la gravedad de la situación', correct: false }
    ]
  },
  {
    question: 'Que pregunta le hace Chirsty al partos Scott en una de las primeras escenas que refleja su desesperación y pérdida de fe?',
    answers: [
      { text: '¿Por qué Dios permite que una niña tan amora sufra tanto?', correct: true },
      { text: '¿Por qué no me ayuda a curar a mi hija?', correct: false },
      { text: '¿Por qué me abandonó?', correct: false },
      { text: '¿Por qué no me da una señal?', correct: false }
    ]
  },
  {
    question: '¿Cómo actúa Kevin, el padre, frente a la crisis de fe y desesperación de su esposa Christy?',
    answers: [
      { text: 'Se mantiene firme en su fe y es un pilar de apoyo sin presionarla.', correct: true },
      { text: 'También pierde la fe y decide dejar de ir a la iglesia con ella.', correct: false },
      { text: 'Se enoja constantemente y la obliga a orar todos los días.', correct: false },
      { text: 'Se aleja de la familia al no poder soportar la presión de la enfermedad.', correct: false }
    ]
  },
  {
    question: '¿A qué ciudad viaja Christy desesperadamente con Anna sin tener una cita médica confirmada?',
    answers: [
      { text: 'Boston', correct: true },
      { text: 'Nueva York', correct: false },
      { text: 'Los Ángeles', correct: false },
      { text: 'Chicago', correct: false }
    ]
  },
  {
    question: '¿Cuál es la especialidad del Dr. Samuel Nurko, el único médico que puede ayudar a Anna?',
    answers: [
      { text: 'Neurocirujano pediátrico', correct: false },
      { text: 'Cardiólogo especialista', correct: false },
      { text: 'Oncólogo infantil', correct: false },
      { text: 'Gastroenterólogo pediátrico', correct: true }
    ]
  },
  {
    question: 'En el hospital en Boston, ¿qué hace Christy para conmover a la recepcionista y pedirle una cita?',
    answers: [
      { text: 'Le ofrece un soborno', correct: false },
      { text: 'Le enumera de memoria cada medicamento y horario vital que su hija necesita para sobrevivir', correct: true },
      { text: 'Finge que Anna se está desmayando', correct: false },
      { text: 'Amenaza con llamar a la prensa', correct: false }
    ]
  },
  {
    question: '¿Cómo se llama la camarera que se convierte en amiga y guía turística para Christy y Anna en Boston?',
    answers: [
      { text: 'Angela', correct: true },
      { text: 'Martha', correct: false },
      { text: 'Susan', correct: false },
      { text: 'Rachel', correct: false }
    ]
  },
  {
    question: '¿En qué vehículo transporta Angela a Christy y a Anna durante su recorrido turístico por Boston?',
    answers: [
      { text: 'En un autobús turístico rentado', correct: false },
      { text: 'En el auto viejo y estropeado de Angela', correct: true },
      { text: 'En un taxi', correct: false },
      { text: 'En el metro subterráneo', correct: false }
    ]
  },
  {
    question: 'Durante su día de turismo por la ciudad, ¿a qué lugar lleva Angela a Anna que la deja maravillada?',
    answers: [
      { text: 'A un parque de diversiones', correct: false },
      { text: 'A un zoológico', correct: false },
      { text: 'A un acuario para ver animales marinos', correct: true },
      { text: 'A un museo de ciencias', correct: false }
    ]
  },
  {
    question: 'En los pasillos del hospital, Anna se queda observando detenidamente una obra de arte. ¿De qué se trata?',
    answers: [
      { text: 'Una escultura de bronce', correct: false },
      { text: 'Un mural de dibujos animados', correct: false },
      { text: 'Una pintura abstracta tipo acuarela/impresionista', correct: true },
      { text: 'Un mapa antiguo de la ciudad', correct: false }
    ]
  },
  {
    question: 'En su primera consulta, ¿qué personaje animado lleva el Dr. Nurko en su corbata para hacer reír a Anna?',
    answers: [
      { text: 'Elmo', correct: true },
      { text: 'Mickey Mouse', correct: false },
      { text: 'Bob Esponja', correct: false },
      { text: 'Winnie the Pooh', correct: false }
    ]
  },
  {
    question: 'Según la broma del Dr. Nurko, ¿por qué tiene que llevar puesta esa corbata infantil?',
    answers: [
      { text: 'Porque es el uniforme obligatorio', correct: false },
      { text: 'Porque fue un regalo de su hija', correct: false },
      { text: 'Porque perdió una apuesta con Elmo', correct: true },
      { text: 'Porque manchó su corbata original', correct: false }
    ]
  },
  {
    question: '¿Cuál es la postura del Dr. Nurko frente al tratamiento con la medicina experimental que le receta a Anna?',
    answers: [
      { text: 'Advierte que no es una cura, sino una forma de aliviar el dolor, y es muy honesto sobre los fuertes riesgos.', correct: true },
      { text: 'Garantiza a la familia que la medicina eliminará la enfermedad por completo en pocos meses.', correct: false },
      { text: 'Se niega rotundamente a usarla porque cree que la fe de la familia es el único tratamiento necesario.', correct: false },
      { text: 'La receta en secreto sin informar a los padres sobre los peligrosos efectos secundarios.', correct: false }
    ]
  },
  {
    question: 'En el aeropuerto, el sistema falla justo cuando Kevin intenta pagar los boletos. ¿Qué acción del empleado permite que viajen?',
    answers: [
      { text: 'Al escuchar a las hijas de Kevin hablar sobre la gravedad de Anna, decide autorizar los boletos sin confirmar el pago.', correct: true },
      { text: 'Llama a su jefe para pedir que les regalen el viaje por caridad.', correct: false },
      { text: 'Usa su propia tarjeta de crédito personal para pagar los pasajes de la familia.', correct: false },
      { text: 'Le dice a Kevin que corra hacia el avión y que pague cuando regrese de Boston.', correct: false }
    ]
  },
  {
    question: 'En el hospital de Boston, Anna comparte habitación con otra niña gravemente enferma. ¿Cómo se llama?',
    answers: [
      { text: 'Angela', correct: false },
      { text: 'Abbie', correct: false },
      { text: 'Haley', correct: true },
      { text: 'Adelynn', correct: false }
    ]
  },
  {
    question: '¿Qué objeto muy especial le regala Anna a Haley para que no tenga miedo?',
    answers: [
      { text: 'Un collar con una cruz.', correct: true },
      { text: 'Una pulsera de la amistad.', correct: false },
      { text: 'Un osito de peluche que le dio su papá.', correct: false },
      { text: 'Un libro de cuentos sobre ángeles.', correct: false }
    ]
  },
  {
    question: '¿Cómo reacciona Ben (el padre de Haley, la niña con cáncer) cuando descubre el regalo que Anna le dio a su hija?',
    answers: [
      { text: 'Se molesta y le pide a Christy que Anna mantenga sus creencias para sí misma, pues no quiere falsas esperanzas.', correct: true },
      { text: 'Se conmueve hasta las lágrimas y le agradece inmediatamente a Anna por darle paz a su hija.', correct: false },
      { text: 'Lo tira a la basura frente a las niñas porque está resentido con cualquier símbolo religioso.', correct: false },
      { text: 'Le devuelve el collar educadamente explicando que su familia practica una religión completamente diferente.', correct: false }
    ]
  },  
  {
    question: 'Tras meses de tratamiento sin mejoras, Anna alcanza su punto de quiebre emocional. ¿Qué confesión le hace a su mamá?',
    answers: [
      { text: 'Le dice que ya no quiere seguir luchando y que quiere morir e ir al cielo, donde ya no hay dolor.', correct: true },
      { text: 'Le confiesa que siente mucha envidia de sus hermanas porque ellas están sanas y pueden jugar.', correct: false },
      { text: 'Le dice que está enojada con el Dr. Nurko y que planea escaparse del hospital esa misma noche.', correct: false },
      { text: 'Le confiesa que cree que Dios la está castigando por portarse mal cuando era más pequeña.', correct: false }
    ]
  },
  {
    question: '¿Por qué el Dr. Nurko decide darle de el alta a Anna para que regrese a Texas?',
    answers: [
      { text: 'Porque ya estaba completamente sana', correct: false },
      { text: 'Porque ya no había nada más que hacer médicamente y quería que estuviera con su familia', correct: true },
      { text: 'Porque no podían pagar más el hospital', correct: false },
      { text: 'Porque se portó mal en el hospital', correct: false }
    ]
  },
  {
    question: 'De regreso en casa, ¿quién anima a Anna a salir de la cama e intentar trepar el gran árbol?',
    answers: [
      { text: 'Su hermana mayor, Abbie.', correct: true },
      { text: 'Su hermana menor, Adelynn.', correct: false },
      { text: 'Su padre, Kevin.', correct: false },
      { text: 'Su amiga del hospital, Haley.', correct: false }
    ]
  },
  {
    question: '¿Qué tipo específico de árbol es en el que ocurre el fatídico accidente?',
    answers: [
      { text: 'Un roble macizo', correct: false },
      { text: 'Un pino de gran altura', correct: false },
      { text: 'Un manzano', correct: false },
      { text: 'Un árbol muy viejo y hueco', correct: true }
    ]
  },
  {
    question: '¿Por qué se rompe la rama gruesa en la que estaban sentadas las niñas?',
    answers: [
      { text: 'Porque un rayo había golpeado el árbol', correct: false },
      { text: 'Porque el interior de la madera estaba totalmente podrido y ahuecado', correct: true },
      { text: 'Porque había un fuerte viento', correct: false },
      { text: 'Porque ambas saltaron', correct: false }
    ]
  },
   {
    question: ' ¿qué viaje imagina Anna que haría con su madre algún día a inicios de la pelicula?',
    answers: [
      { text: 'Ir a París', correct: true },
      { text: 'Viajar a Hawái', correct: false },
      { text: 'Conocer las pirámides de Egipto', correct: false },
      { text: 'Ir de safari a África', correct: false }
    ]
  },
  {
    question: '¿Aproximadamente qué altura tiene la caída que sufre Anna por el interior del tronco?',
    answers: [
      { text: '10 pies', correct: false },
      { text: '15 pies', correct: false },
      { text: '30 pies (casi 10 metros)', correct: true },
      { text: '50 pies', correct: false }
    ]
  },
  {
    question: '¿Qué personaje vive el cambio espiritual más grande al perder su fe y luego recuperarla tras el milagro?',
    answers: [
      { text: 'Christy, la mamá de Anna, quien dejó de creer por el dolor de ver a su hija sufrir.', correct: true },
      { text: 'Kevin, el papá, quien siempre fue escéptico y no creía en milagros.', correct: false },
      { text: 'El Dr. Nurko, quien decide dejar la medicina para volverse religioso.', correct: false },
      { text: 'Angela, la camarera, quien no creía en Dios hasta que conoció a Anna.', correct: false }
    ]
  },
  {
    question: '¿Qué es lo primero que intenta hacer Kevin cuando descubre que Anna cayó dentro del árbol?',
    answers: [
      { text: 'Cortar el árbol con una sierra', correct: false },
      { text: 'Intenta meterse él mismo por el agujero pero no cabe', correct: true },
      { text: 'Lanza una cuerda y le pide que escale', correct: false },
      { text: 'Empuja el árbol', correct: false }
    ]
  },
  {
    question: '¿Cuál era el mayor peligro que temían los bomberos si intentaban romper el árbol para sacarla por debajo?',
    answers: [
      { text: 'Que las raíces inundaran el hueco de agua', correct: false },
      { text: 'Que la madera podrida colapsara hacia adentro y aplastara a Anna', correct: true },
      { text: 'Que provocaran un incendio', correct: false },
      { text: 'Que el árbol cayera sobre la casa', correct: false }
    ]
  },
  {
    question: '¿Aproximadamente cuánto tiempo permanece Anna atrapada en el fondo del árbol?',
    answers: [
      { text: 'Aproximadamente 5 horas.', correct: true },
      { text: 'Unos pocos minutos, ya que fue rescatada casi de inmediato.', correct: false },
      { text: 'Alrededor de 12 horas, hasta altas horas de la madrugada.', correct: false },
      { text: 'Toda la noche, siendo rescatada a la mañana siguiente.', correct: false }
    ]
  },
  {
    question: 'En la visión que tiene Anna mientras está inconsciente, ¿qué criatura brillante la guía a través de la oscuridad?',
    answers: [
      { text: 'Una luciérnaga', correct: false },
      { text: 'Un pájaro azul', correct: false },
      { text: 'Una mariposa blanca', correct: true },
      { text: 'Una paloma', correct: false }
    ]
  },
  {
    question: 'Dentro de la película, ¿qué representa simbólicamente la mariposa blanca?',
    answers: [
      { text: 'La primavera', correct: false },
      { text: 'La transformación, la resurrección y la pureza', correct: true },
      { text: 'La fragilidad', correct: false },
      { text: 'El insecto favorito de Anna', correct: false }
    ]
  },
  {
    question: 'Cuando el entorno oscuro se transforma en la visión del Cielo, ¿qué elemento destaca en el paisaje iluminado?',
    answers: [
      { text: 'Nubes de algodón', correct: false },
      { text: 'Calles de oro', correct: false },
      { text: 'Vastas extensiones de flores y un lago apacible', correct: true },
      { text: 'Una gran ciudad brillante', correct: false }
    ]
  },
  {
    question: 'Según relata Anna, ¿cómo conversaban ella y Dios en ese entorno celestial?',
    answers: [
      { text: 'Se comunicaban a través de sus pensamientos, sin necesidad de usar la boca para hablar.', correct: true },
      { text: 'Hablaban en un idioma antiguo que ella mágicamente podía entender a la perfección.', correct: false },
      { text: 'Dios le escribía mensajes en las nubes para que ella los pudiera leer.', correct: false },
      { text: 'Conversaban usando un eco muy fuerte que resonaba por todo el lugar luminoso.', correct: false }
    ]
  },
  {
    question: '¿Qué petición desesperada le hace Anna a Dios durante su experiencia extracorpórea?',
    answers: [
      { text: 'Que le dé poderes', correct: false },
      { text: 'Que sus padres ganen la lotería', correct: false },
      { text: 'Le ruega quedarse en el Cielo para librarse del dolor físico', correct: true },
      { text: 'Que castigue a los médicos', correct: false }
    ]
  },
  {
    question: '¿Qué promesa divina recibe Anna justo antes de despertar de su visión?',
    answers: [
      { text: 'Que nunca volverá a enfermarse', correct: false },
      { text: 'Que cuando los bomberos la saquen, estará completamente sana', correct: true },
      { text: 'Que será famosa', correct: false },
      { text: 'Que el árbol desaparecerá', correct: false }
    ]
  },
  {
    question: 'Inmediatamente después de ser rescatada del tronco, ¿en qué estado se encuentra Anna?',
    answers: [
      { text: 'Está consciente, reconoce a sus padres y solo tiene rasguños menores, sin ninguna fractura o herida grave.', correct: true },
      { text: 'Está en coma profundo y los paramédicos tienen que reanimarla con urgencia en el lugar.', correct: false },
      { text: 'Sobrevive, pero tiene múltiples fracturas en las piernas y los brazos por el impacto.', correct: false },
      { text: 'Está ilesa físicamente pero sufre de amnesia temporal y no recuerda cómo llegó ahí.', correct: false }
    ]
  },
  {
    question: '¿Qué parte específica de la anatomía de Anna recibió el golpe más severo durante su caída?',
    answers: [
      { text: 'Las piernas', correct: false },
      { text: 'La columna vertebral', correct: false },
      { text: 'El abdomen distendido', correct: false },
      { text: 'La cabeza', correct: true }
    ]
  },
  {
    question: 'Tras hacerle tomografías en traumatología, ¿qué lesiones físicas encuentran los médicos?',
    answers: [
      { text: 'Solo rasguños, ninguna fractura o daño interno grave.', correct: true },
      { text: 'Fracturas en ambas piernas y varias costillas rotas por el impacto.', correct: false },
      { text: 'Daño espinal severo que requiere una cirugía de emergencia.', correct: false },
      { text: 'Una hemorragia interna en el estómago y el brazo derecho roto.', correct: false }
    ]
  },
  {
    question: 'Después de algunos días en casa, ¿qué acto demuestra definitivamente que Anna se ha curado de su enfermedad digestiva?',
    answers: [
      { text: 'Come comida normal con su familia sin sentir dolor y juega felizmente corriendo con sus hermanas.', correct: true },
      { text: 'El Dr. Nurko viaja hasta su casa para darle el alta médica tras revisar sus últimos exámenes.', correct: false },
      { text: 'Bebe un té especial que le preparó su abuela y su estómago se desinflama mágicamente en segundos.', correct: false },
      { text: 'Se pasa todo el día durmiendo profundamente sin necesitar los analgésicos del hospital.', correct: false }
    ]
  },
  {
    question: '¿Qué actitud muestra el pastor Scott antes de que Christy hable a los presentes?',
    answers: [
      { text: 'Le prohíbe hablar', correct: false },
      { text: 'La recibe con los brazos abiertos y pide que la escuchen', correct: true },
      { text: 'La ignora', correct: false },
      { text: 'Le pide que pida perdón', correct: false }
    ]
  },
  {
    question: '¿Qué noticia reveladora le da Ben Wexler a la congregación sobre su hija Haley?',
    answers: [
      { text: 'Que Haley se curó igual que Anna', correct: false },
      { text: 'Que Haley falleció, pero sus últimos días fueron de absoluta paz gracias a Anna', correct: true },
      { text: 'Que Haley está en coma', correct: false },
      { text: 'Que encontraron una medicina', correct: false }
    ]
  },
  {
    question: 'Durante su discurso, ¿qué reflexión personal hace Christy sobre cómo atravesó la enfermedad?',
    answers: [
      { text: 'Que siempre tuvo una fe perfecta', correct: false },
      { text: 'Que el dolor la cegó y le impidió ver los pequeños milagros diarios a su alrededor', correct: true },
      { text: 'Que los doctores fueron inútiles', correct: false },
      { text: 'Que nunca dudó de la curación', correct: false }
    ]
  },
  {
    question: 'Según las palabras finales de Christy, ¿qué constituyen los verdaderos "milagros cotidianos"?',
    answers: [
      { text: 'Eventos de magia y luces', correct: false },
      { text: 'Encontrar dinero', correct: false },
      { text: 'Ganar la lotería', correct: false },
      { text: 'Los actos de bondad gratuita y sacrificio que las personas hacen por otras', correct: true }
    ]
  },
  {
    question: '¿A qué le adjudica Kevin que él pudo mantenerse firme cuando Christy perdió la esperanza?',
    answers: [
      { text: 'A que la fe era su única protección (refugio) contra la tormenta', correct: true },
      { text: 'A que su trabajo lo distraía', correct: false },
      { text: 'A que los médicos le prometieron curarla', correct: false },
      { text: 'A que no entendía la gravedad', correct: false }
    ]
  },
  {
    question: '¿Qué aprenden las hermanas Abbie y Adelynn durante toda la experiencia de la enfermedad de Anna?',
    answers: [
      { text: 'A odiar los hospitales', correct: false },
      { text: 'A apreciar la salud y mantener a la familia unida con amor', correct: true },
      { text: 'A ignorar los problemas', correct: false },
      { text: 'A no trepar árboles nunca más', correct: false }
    ]
  },
  {
    question: '¿Qué lección final sobre el dolor humano intenta dejar la película?',
    answers: [
      { text: 'Que el dolor es un castigo', correct: false },
      { text: 'Que el sufrimiento siempre trae dinero', correct: false },
      { text: 'Que el dolor es real, pero no estamos solos si nos apoyamos en la compasión y la fe', correct: true },
      { text: 'Que la medicina no sirve', correct: false }
    ]
  },
  {
    question: '¿Qué le dice Kevin a Christy al inicio de la película para intentar calmar sus ansiedades sobre el dinero?',
    answers: [
      { text: 'Le asegura que todo saldrá bien porque trabajarán duro y Dios proveerá, manteniendo una actitud muy optimista.', correct: true },
      { text: 'Le promete que pedirá un préstamo a sus padres millonarios para cubrir todas las deudas de la casa.', correct: false },
      { text: 'Le sugiere que ella busque un segundo trabajo en las noches para ayudar a pagar la clínica veterinaria.', correct: false },
      { text: 'Le miente diciendo que ya pagó todas las deudas, ocultando los avisos de cobro del banco.', correct: false }
    ]
  },
  {
    question: 'En la visión de Anna, ¿qué significa la luz brillante que envuelve todo el paisaje?',
    answers: [
      { text: 'Representa la presencia misma de Dios, que le transmite una paz absoluta y la ausencia de dolor.', correct: true },
      { text: 'Es el reflejo de las potentes linternas de los bomberos intentando encontrarla en la oscuridad.', correct: false },
      { text: 'Es un destello mágico creado por las mariposas que vuelan a su alrededor en ese lugar.', correct: false },
      { text: 'Es la luz del sol de la tarde que logra filtrarse por las grietas del árbol hueco.', correct: false }
    ]
  },
  {
    question: '¿Cómo logra Anna mantenerse positiva a pesar de tener un abdomen distendido y tubos de alimentación?',
    answers: [
      { text: 'Ignorando a todos a su alrededor', correct: false },
      { text: 'Enfocándose en quejarse todo el tiempo', correct: false },
      { text: 'Aferrándose a su fe y al amor de su familia', correct: true },
      { text: 'Viendo mucha televisión', correct: false }
    ]
  },
  {
    question: '¿Qué hecho "imposible" convence a la mamá de Anna de que el rescate fue un milagro real?',
    answers: [
      { text: 'Que Anna cayó 10 metros de cabeza y no se rompió ni un solo hueso ni quedó paralizada.', correct: true },
      { text: 'Que el árbol se abrió a la mitad por sí solo para dejarla salir.', correct: false },
      { text: 'Que los bomberos lograron sacarla en menos de un minuto.', correct: false },
      { text: 'Que Anna salió volando del tronco impulsada por una fuerza extraña.', correct: false }
    ]
  },
  {
    question: '¿Qué gesto simbólico hace el Dr. Nurko al ver a Anna sana al final?',
    answers: [
      { text: 'Se quita su famosa corbata de Elmo.', correct: true },
      { text: 'Le regala su estetoscopio.', correct: false },
      { text: 'Se pone una bata de colores.', correct: false },
      { text: 'Baila en el pasillo.', correct: false }
    ]
  },
  {
    question: '¿Qué hace Kevin cuando se da cuenta de que la situación del árbol es crítica?',
    answers: [
      { text: 'Llama inmediatamente al 911 y pide ayuda profesional', correct: true },
      { text: 'Va a buscar un hacha', correct: false },
      { text: 'Empieza a llorar sin hacer nada', correct: false },
      { text: 'Intenta empujar el árbol con su auto', correct: false }
    ]
  }
];
