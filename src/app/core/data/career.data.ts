import { Career } from '../models/career.model';

export const CAREERS: Career[] = [
  // AREA QUIMICA
  {
    id: 'qui_quimica',
    name: 'Técnico / Ingeniería en Química',
    area: 'Área Química y Procesos',
    description: 'Especialidad enfocada en análisis de laboratorio, procesos industriales y control de calidad, donde la gestión responsable de reactivos y subproductos previene el impacto ambiental.',
    icon: 'flask-outline',
    gradientClass: 'theme-quimica',
    bgDecorIcons: ['flask-outline', 'nuclear-outline', 'water-outline'],
    wastes: [
      {
        name: 'Solventes Orgánicos Usados',
        material: 'chemical',
        description: 'Líquidos inflamables empleados para disoluciones, limpiezas y síntesis (acetona, etanol, hexano).',
        standardRecycling: 'Destilación fraccionada en laboratorios autorizados para recuperar disolventes con un 95% de pureza y reintroducirlos en procesos de limpieza industrial.',
        innovativeRecycling: 'Co-procesamiento térmico en hornos cementeros de alta tecnología como combustible alternativo limpio, o conversión catalítica en hidrocarburos base para bioplásticos.'
      },
      {
        name: 'Envases de Reactivos Químicos',
        material: 'plastic',
        description: 'Frascos de HDPE (Polietileno de Alta Densidad) o vidrio que contuvieron sustancias químicas.',
        standardRecycling: 'Triple lavado obligatorio en origen, trituración mecánica y extrusión para crear tuberías de drenaje industrial no destinadas a uso alimentario.',
        innovativeRecycling: 'Reciclaje químico por pirólisis para descomponer el polímero en aceite de pirólisis, el cual se utiliza para sintetizar plástico virgen de grado médico libre de contaminantes históricos.'
      },
      {
        name: 'Ácidos e Hidróxidos Agotados',
        material: 'chemical',
        description: 'Soluciones acuosas ácidas (pH < 2) o alcalinas (pH > 12) utilizadas en titulaciones y limpiezas de instrumental.',
        standardRecycling: 'Neutralización química controlada mediante la mezcla balanceada de corrientes ácidas y básicas en plantas de tratamiento, ajustando el pH a 7.0 antes de su descarga segura.',
        innovativeRecycling: 'Recuperación de sales minerales de alta pureza (como sulfato de calcio o cloruro de sodio industrial) mediante cristalización por evaporación solar al vacío para su venta como insumos químicos.'
      }
    ]
  },
  // AREA CONSTRUCCION
  {
    id: 'con_construccion',
    name: 'Ingeniería / Técnico en Construcción',
    area: 'Área Construcción y Obras Civiles',
    description: 'Carrera dedicada a la planificación y ejecución de obras civiles, vialidad y edificación, con alto potencial de valorización de escombros y maderas sobrantes.',
    icon: 'hammer-outline',
    gradientClass: 'theme-construccion',
    bgDecorIcons: ['hammer-outline', 'home-outline', 'construct-outline'],
    wastes: [
      {
        name: 'Madera de Encofrado y Despuntes',
        material: 'wood',
        description: 'Tablas, listones y contrachapados de pino utilizados para moldes de hormigón y andamiajes temporales.',
        standardRecycling: 'Limpieza de clavos/cemento y trituración para la fabricación de tableros de partículas (MDP/MDF), palets de transporte o compostaje en plantas de biomasa.',
        innovativeRecycling: 'Producción de paneles acústicos aislantes mediante la combinación de virutas de madera limpias con aglutinantes orgánicos de micelio de hongo, logrando aislamiento térmico biodegradable e ignífugo.'
      },
      {
        name: 'Escombros de Hormigón y Ladrillo',
        material: 'construction',
        description: 'Restos de estructuras demolidas, sobreproducción de hormigón fresco y restos de mampostería.',
        standardRecycling: 'Chancado y cribado mecánico para obtener áridos reciclados gruesos y finos, utilizados en la pavimentación de caminos secundarios y rellenos estructurales.',
        innovativeRecycling: 'Carbonatación acelerada de áridos reciclados: inyección de CO2 industrial capturado en la grava de hormigón reciclado para mejorar su resistencia mecánica y almacenar carbono de forma permanente dentro del nuevo cemento.'
      },
      {
        name: 'Plásticos de Embalaje y EPS',
        material: 'plastic',
        description: 'Film estirable de paletizado (LDPE) y Poliestireno Expandido (plumavit) usado como aislamiento y protección de materiales.',
        standardRecycling: 'Compactación in-situ del plumavit para reducir volumen en un 90% y posterior extrusión en pellets de poliestireno para molduras decorativas o reglas escolares.',
        innovativeRecycling: 'Transformación del plumavit residual mediante disolución química verde en barnices impermeabilizantes de alta duración para maderas y sellantes para fachadas de hormigón.'
      }
    ]
  },
  // AREA MECANICA
  {
    id: 'mec_automotriz',
    name: 'Ingeniería / Técnico en Mecánica y Electromovilidad Automotriz',
    area: 'Área Mecánica',
    description: 'Enfocada en el diagnóstico y reparación de vehículos convencionales e híbridos/eléctricos, liderando la transición a transportes limpios y baterías recargables.',
    icon: 'cog-outline',
    gradientClass: 'theme-mecanica',
    bgDecorIcons: ['cog-outline', 'settings-outline', 'car-sport-outline'],
    wastes: [
      {
        name: 'Baterías de Litio Dañadas (Vehículos Eléctricos)',
        material: 'battery',
        description: 'Celdas de iones de litio desgastadas o dañadas procedentes de autos eléctricos.',
        standardRecycling: 'Desensamblaje manual seguro en instalaciones certificadas y trituración mecánica para recuperar la "masa negra" (cobalto, litio y níquel).',
        innovativeRecycling: 'Procesamiento pirometalúrgico avanzado para recuperar el 95% del litio de grado batería y reacondicionamiento de celdas antiguas para baterías estacionarias de almacenamiento solar domiciliario.'
      },
      {
        name: 'Aceite de Motor Usado',
        material: 'chemical',
        description: 'Lubricantes degradados extraídos de motores de combustión interna.',
        standardRecycling: 'Re-refinación industrial para eliminar aditivos degradados, obteniendo bases lubricantes purificadas listas para formular aceite nuevo.',
        innovativeRecycling: 'Pirólisis catalítica del aceite de motor usado para transformarlo en queroseno de aviación o combustibles sintéticos ligeros de alta eficiencia.'
      },
      {
        name: 'Neumáticos de Descarte',
        material: 'plastic',
        description: 'Neumáticos gastados que ya no cumplen con los límites de seguridad vial.',
        standardRecycling: 'Trituración criogénica para obtener caucho molido para carpetas de canchas de pasto sintético y asfaltos modificados.',
        innovativeRecycling: 'Pirólisis para obtener negro de humo purificado para su uso en tintas y diésel ecológico para maquinaria pesada.'
      }
    ]
  },
  {
    id: 'mec_maquinaria',
    name: 'Ingeniería / Técnico en Maquinaria Pesada',
    area: 'Área Mecánica',
    description: 'Carrera orientada al mantenimiento de grandes equipos industriales, agrícolas y mineros, gestionando fluidos hidráulicos a alta presión y piezas de gran tonelaje.',
    icon: 'construct-outline',
    gradientClass: 'theme-mecanica',
    bgDecorIcons: ['construct-outline', 'settings-outline', 'cog-outline'],
    wastes: [
      {
        name: 'Fluidos Hidráulicos Usados',
        material: 'chemical',
        description: 'Aceites hidráulicos de transmisiones pesadas degradados por temperatura y presión.',
        standardRecycling: 'Filtración de partículas de metal por centrifugación y deshidratación al vacío para reutilizar en sistemas hidráulicos de menor exigencia.',
        innovativeRecycling: 'Conversión por hidrocraqueo en lubricantes base de alta gama (Grupo III), eliminando la dependencia de petróleo crudo nuevo.'
      },
      {
        name: 'Filtros de Aceite and Aire Usados',
        material: 'metal',
        description: 'Filtros metálicos saturados con aceites usados y partículas abrasivas.',
        standardRecycling: 'Prensado hidráulico para extraer el aceite remanente y trituración de las carcasas metálicas para fundición en siderúrgicas.',
        innovativeRecycling: 'Separación térmica del papel filtrante impregnado para generar energía y reciclaje del 100% de la aleación metálica estructural.'
      }
    ]
  },
  {
    id: 'mec_mantenimiento',
    name: 'Ingeniería / Técnico en Mantenimiento Industrial',
    area: 'Área Mecánica',
    description: 'Orientada a garantizar la disponibilidad y confiabilidad de plantas productivas, mitigando rozamientos y gestionando repuestos metálicos de descarte.',
    icon: 'settings-outline',
    gradientClass: 'theme-mecanica',
    bgDecorIcons: ['settings-outline', 'build-outline', 'cog-outline'],
    wastes: [
      {
        name: 'Rodamientos y Componentes Metálicos Desgastados',
        material: 'metal',
        description: 'Piezas de acero templado o bronce que han cumplido su ciclo de vida útil.',
        standardRecycling: 'Fundición en hornos eléctricos de inducción para la creación de perfiles y vigas estructurales de acero.',
        innovativeRecycling: 'Recuperación de aleaciones de acero rápido (HSS) mediante atomización por agua para crear polvos metálicos de impresión 3D industrial.'
      },
      {
        name: 'Grasas Lubricantes y Estopas Limpiadoras',
        material: 'chemical',
        description: 'Trapos y polímeros absorbentes impregnados de aceites, disolventes y grasas pesadas.',
        standardRecycling: 'Incinineración segura en termoeléctricas autorizadas bajo estrictas normas de emisión de gases.',
        innovativeRecycling: 'Tratamiento por ultrasonido para extraer aceites residuales de los textiles de limpieza, permitiendo reciclar el paño de algodón varias veces.'
      }
    ]
  },
  {
    id: 'mec_mecatronica',
    name: 'Ingeniería / Técnico en Mecatrónica',
    area: 'Área Mecánica',
    description: 'Carrera que fusiona la mecánica industrial con la electrónica e informática para crear sistemas inteligentes automatizados de manufactura.',
    icon: 'build-outline',
    gradientClass: 'theme-mecanica',
    bgDecorIcons: ['build-outline', 'hardware-chip-outline', 'cog-outline'],
    wastes: [
      {
        name: 'Placas de Sensores y Controladores Dañados',
        material: 'e_waste',
        description: 'Módulos microcontroladores y sensores con fallas electrónicas irreparables.',
        standardRecycling: 'Trituración y separación electromagnética de metales para su fundición.',
        innovativeRecycling: 'Biolixiviación bacteriana para extraer trazas de oro y plata de los pines de conexión sin utilizar cianuro ni ácidos altamente contaminantes.'
      },
      {
        name: 'Mangueras Neumáticas e Hidráulicas Flexibles',
        material: 'plastic',
        description: 'Mangueras de poliuretano y caucho reforzado con mallas de acero.',
        standardRecycling: 'Separación física de la malla de acero interior y molienda del caucho/plástico para aditivos industriales.',
        innovativeRecycling: 'Desvulcanización química del caucho sintético de las mangueras para crear sellos elásticos y amortiguadores de vibración mecatrónicos nuevos.'
      }
    ]
  },
  // AREA INFORMATICA
  {
    id: 'inf_informatica',
    name: 'Ingeniería / Técnico en Informática',
    area: 'Área Informática, Ciberseguridad y Automatización',
    description: 'Especialidad en desarrollo de software, gestión de datos e infraestructura digital, enfrentando el reto del descarte de equipos informáticos.',
    icon: 'desktop-outline',
    gradientClass: 'theme-electronica',
    bgDecorIcons: ['desktop-outline', 'code-slash-outline', 'logo-angular'],
    wastes: [
      {
        name: 'Equipos Computacionales Obsoletos',
        material: 'e_waste',
        description: 'Gabinetes, placas madre y procesadores en desuso por obsolescencia tecnológica.',
        standardRecycling: 'Desmantelamiento manual y separación de metales ferrosos, aluminio, cobre y plásticos ABS.',
        innovativeRecycling: 'Refabricación de ordenadores de bajo costo usando carcasas impresas en plástico reciclado para laboratorios de escuelas rurales vulnerables.'
      },
      {
        name: 'Cables de Red y UTP',
        material: 'e_waste',
        description: 'Cables de conexión ethernet compuestos de filamentos de cobre y fundas plásticas.',
        standardRecycling: 'Granulado mecánico de cables para separar el cobre electrolítico puro de la cubierta plástica de PVC.',
        innovativeRecycling: 'Extrusión de la cubierta plástica aislante para crear canalizaciones eléctricas subterráneas de alta resistencia.'
      }
    ]
  },
  {
    id: 'inf_ciberseguridad',
    name: 'Ingeniería / Técnico en Ciberseguridad',
    area: 'Área Informática, Ciberseguridad y Automatización',
    description: 'Orientada a la protección de datos e infraestructura informática crítica, donde la destrucción física de datos genera residuos específicos.',
    icon: 'shield-checkmark-outline',
    gradientClass: 'theme-electronica',
    bgDecorIcons: ['shield-checkmark-outline', 'lock-closed-outline', 'key-outline'],
    wastes: [
      {
        name: 'Discos Duros Triturados',
        material: 'e_waste',
        description: 'Dispositivos de almacenamiento destruidos físicamente para asegurar la confidencialidad de los datos.',
        standardRecycling: 'Separación magnética del aluminio y acero inoxidable de las carcasas trituradas.',
        innovativeRecycling: 'Recuperación de imanes de tierras raras (Neodimio-Hierro-Boro) de los cabezales de los discos triturados para la fabricación de motores de generadores eólicos.'
      }
    ]
  },
  {
    id: 'inf_automatizacion',
    name: 'Ingeniería / Técnico en Automatización y Robótica',
    area: 'Área Informática, Ciberseguridad y Automatización',
    description: 'Enfocada en el diseño de sistemas de control industrial inteligentes y robóticos que optimizan el uso de recursos energéticos y materiales.',
    icon: 'git-network-outline',
    gradientClass: 'theme-electronica',
    bgDecorIcons: ['git-network-outline', 'hardware-chip-outline', 'pulse-outline'],
    wastes: [
      {
        name: 'Cables Apantallados de Señal',
        material: 'e_waste',
        description: 'Conductores de cobre protegidos con mallas metálicas para evitar interferencias electromagnéticas.',
        standardRecycling: 'Separación de mallas trenzadas de acero/aluminio de las almas de cobre y posterior fundición.',
        innovativeRecycling: 'Conversión del plástico aislante externo libre de halógenos en recubrimientos protectores flexibles para tuberías de agua caliente.'
      },
      {
        name: 'Servomotores Industriales Dañados',
        material: 'e_waste',
        description: 'Motores de precisión con bobinados quemados.',
        standardRecycling: 'Desbobinado de cobre electrolítico y fundición de carcasas de aluminio de alta pureza.',
        innovativeRecycling: 'Aprovechamiento de los imanes permanentes internos y ejes de acero templado para armar kits de aprendizaje de robótica en liceos técnicos.'
      }
    ]
  },
  {
    id: 'inf_teleco',
    name: 'Ingeniería / Técnico en Telecomunicaciones',
    area: 'Área Informática, Ciberseguridad y Automatización',
    description: 'Área de conectividad de datos mediante redes móviles y fibra óptica, con un importante reto en la valorización de tendidos aéreos e infraestructura de antenas.',
    icon: 'wifi-outline',
    gradientClass: 'theme-electronica',
    bgDecorIcons: ['wifi-outline', 'pulse-outline', 'radio-outline'],
    wastes: [
      {
        name: 'Cables de Fibra Óptica Obsoletos',
        material: 'glass',
        description: 'Restos de hilos de vidrio de sílice con capas de protección de polietileno y fibras de aramida.',
        standardRecycling: 'Incinineración controlada para recuperar energía de los plásticos de protección, segregando el vidrio restante.',
        innovativeRecycling: 'Separación de las fibras de aramida (Kevlar) para su reciclado como refuerzo mecánico en hormigones ligeros de fachadas edilicias.'
      },
      {
        name: 'Enrutadores y Antenas en Desuso',
        material: 'e_waste',
        description: 'Equipos receptores de telecomunicaciones que han cumplido su ciclo de vida útil.',
        standardRecycling: 'Clasificación de placas electrónicas, carcasas de aluminio y plásticos para fundición y extrusión.',
        innovativeRecycling: 'Extracción biotecnológica de plásticos termoestables de antenas para integrarlos en pavimentos viales que absorben el impacto sonoro.'
      }
    ]
  },
  // AREA ADMINISTRACION
  {
    id: 'adm_administracion',
    name: 'Ingeniería / Técnico en Administración',
    area: 'Área Administración, Logística y Comercio Exterior',
    description: 'Orientada al liderazgo, control operacional y financiero de las empresas, promoviendo la digitalización y la reducción de la huella de carbono de oficina.',
    icon: 'briefcase-outline',
    gradientClass: 'theme-agronomia',
    bgDecorIcons: ['briefcase-outline', 'document-text-outline', 'bar-chart-outline'],
    wastes: [
      {
        name: 'Papel Blanco de Oficina',
        material: 'paper',
        description: 'Hojas de informes, contratos impresos y facturas archivadas en desuso.',
        standardRecycling: 'Triturado, re-pulpado en agua y blanqueamiento libre de cloro para fabricar nuevas resmas de papel de fotocopia.',
        innovativeRecycling: 'Fabricación de paneles aislantes termo-acústicos prensando la pulpa de papel recuperado con ligantes naturales de almidón de papa.'
      },
      {
        name: 'Cartuchos de Tóner Vacíos',
        material: 'e_waste',
        description: 'Cartuchos plásticos que contenían tintas y polvos de carbono para impresión.',
        standardRecycling: 'Desensamblaje para limpieza del polvo residual e inyección de plásticos para fabricar reglas y bolígrafos.',
        innovativeRecycling: 'Adición del polvo de tóner sobrante rico en óxidos de hierro en mezclas asfálticas para aumentar la rigidez de carreteras de alta carga.'
      }
    ]
  },
  {
    id: 'adm_logistica',
    name: 'Ingeniería / Técnico en Logística',
    area: 'Área Administración, Logística y Comercio Exterior',
    description: 'Enfocada en la cadena de suministro, almacenamiento y transporte de mercancías, donde se gestionan grandes volúmenes de embalajes y pallets.',
    icon: 'cube-outline',
    gradientClass: 'theme-agronomia',
    bgDecorIcons: ['cube-outline', 'airplane-outline', 'boat-outline'],
    wastes: [
      {
        name: 'Film Plástico de Embalar (Stretch)',
        material: 'plastic',
        description: 'Envoltorio plástico de polietileno de baja densidad (LDPE) usado para asegurar cargas en pallets.',
        standardRecycling: 'Compactación in-situ del film y extrusión en pellets para fabricar bolsas de basura de alta resistencia.',
        innovativeRecycling: 'Fabricación de madera plástica sintética de alta resistencia mediante extrusión mixta de plástico film y aserrín industrial, ideal para cercas perimetrales.'
      },
      {
        name: 'Palets de Madera Rotos',
        material: 'wood',
        description: 'Estructuras de madera de pino utilizadas para el soporte de fardos en bodegas.',
        standardRecycling: 'Retiro de clavos metálicos y chipeado para camas de cultivos, compost o combustible de calderas de biomasa.',
        innovativeRecycling: 'Fabricación de mobiliario urbano (bancas de parques, maceteros grandes) mediante el lijado e impermeabilización de listones sanos seleccionados.'
      }
    ]
  },
  {
    id: 'adm_comex',
    name: 'Ingeniería / Técnico en Comercio Exterior',
    area: 'Área Administración, Logística y Comercio Exterior',
    description: 'Lidera la importación y exportación de mercancías bajo estándares globales de sustentabilidad y control logístico aduanero.',
    icon: 'airplane-outline',
    gradientClass: 'theme-agronomia',
    bgDecorIcons: ['airplane-outline', 'boat-outline', 'globe-outline'],
    wastes: [
      {
        name: 'Precintos y Sellos de Seguridad',
        material: 'metal',
        description: 'Sellos de alta seguridad de acero y plásticos ABS usados para precintar las puertas de contenedores marítimos.',
        standardRecycling: 'Corte y trituración para reciclaje de acero en fundiciones de chatarra pesada.',
        innovativeRecycling: 'Moldeo de los plásticos ABS recuperados de los sellos de seguridad para fabricar cascos de protección para trabajadores portuarios.'
      }
    ]
  },
  {
    id: 'adm_contabilidad',
    name: 'Técnico en Contabilidad General',
    area: 'Área Administración, Logística y Comercio Exterior',
    description: 'Área enfocada en el control de registros contables y auditorías, liderando la transición hacia la contabilidad sin papel ("paperless").',
    icon: 'calculator-outline',
    gradientClass: 'theme-agronomia',
    bgDecorIcons: ['calculator-outline', 'trending-up-outline', 'document-outline'],
    wastes: [
      {
        name: 'Documentos e Informes Fiscales',
        material: 'paper',
        description: 'Archivos impresos antiguos recopilados que ya cumplieron el plazo legal de retención tributaria.',
        standardRecycling: 'Trituración segura certificada para resguardar información confidencial y reciclaje de la pulpa celulosa.',
        innovativeRecycling: 'Producción de embalajes moldeados biodegradables para botellas o huevos a partir de pulpa de papel contable reciclado.'
      }
    ]
  },
  // AREA ELECTRICIDAD
  {
    id: 'ele_electricidad',
    name: 'Ingeniería / Técnico Eléctrico',
    area: 'Área Electricidad y Sostenibilidad',
    description: 'Especialidad en el diseño, montaje y mantenimiento de redes de media/baja tensión y sistemas de energía renovable, enfocada en la eficiencia energética.',
    icon: 'flash-outline',
    gradientClass: 'theme-electronica',
    bgDecorIcons: ['flash-outline', 'bulb-outline', 'battery-charging-outline'],
    wastes: [
      {
        name: 'Cables Conductores de Cobre y Aluminio',
        material: 'metal',
        description: 'Trozos de cables de instalaciones y tableros con aislantes poliméricos.',
        standardRecycling: 'Pelado de cables y recuperación del cobre o aluminio metálico para trefilado de conductores nuevos.',
        innovativeRecycling: 'Síntesis química de nanopartículas de óxido de cobre a partir del cableado residual para ser usadas en pinturas auto-limpiantes y antibacteriales.'
      },
      {
        name: 'Canalizaciones Plásticas de PVC',
        material: 'plastic',
        description: 'Tuberías y bandejas de PVC rígido cortadas o dañadas en montajes.',
        standardRecycling: 'Trituración mecánica y extrusión de perfiles plásticos no estructurales o maceteros de jardín.',
        innovativeRecycling: 'Fórmula de compuestos plásticos termoestables mejorados con partículas de vidrio para fabricar cajas de derivación eléctrica de alta resistencia térmica.'
      }
    ]
  }
];
