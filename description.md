
La aplicación **Score-Calculator** fue creada como una herramienta interactiva para evaluar y calcular la optimización de proyectos en función de diferentes categorías predefinidas. Su desarrollo tiene como objetivo principal proporcionar una forma eficiente de identificar las fortalezas y debilidades de un proyecto bajo criterios específicos, haciendo uso de visualizaciones y cálculos normalizados para facilitar la comprensión de los resultados.

### **Objetivos de Score-Calculator**

1.  **Evaluar proyectos basándose en criterios claros:** Proporcionar una estructura en la que los usuarios puedan seleccionar y ponderar diferentes aspectos de un proyecto, facilitando así una evaluación consistente y objetiva.
2.  **Identificar áreas de mejora:** Ayudar a los usuarios a detectar debilidades o áreas menos optimizadas en sus proyectos mediante validaciones y resultados específicos por categoría.
3.  **Presentar datos de forma visualmente atractiva:** Mostrar tanto los resultados numéricos como gráficos interactivos que permitan comprender la información de forma rápida y sencilla.
4.  **Permitir la generación de reportes:** Posibilitar la exportación de los resultados generados (en CSV, JSON o Markdown), proporcionando informes claros y detallados de los aspectos calculados.

----------

### **Asignación de Valores y Cálculos**

#### **Importancia de las Categorías**

Para cada categoría evaluada, se define un nivel de **importancia** que tiene un impacto proporcional sobre el puntaje total mediante factores multiplicativos:

-   **Muy importante:** Se multiplica por **4**.
-   **Importante:** Se multiplica por **3**.
-   **Poco importante:** Se multiplica por **1**.

Esto permite destacar aquellas categorías críticas en la evaluación general y asignarles mayor peso en el cálculo del puntaje.

#### **Valores para los Puntos**

Dentro de cada categoría, los criterios pueden evaluarse según una de estas calificaciones:

-   **Muy bueno:** **+3 puntos**.
-   **Bueno:** **+2 puntos**.
-   **Neutro:** **0 puntos**.
-   **Malo:** **-2 puntos**.
-   **Muy malo:** **-3 puntos**.

Cada selección realizada por el usuario será procesada y ponderada con base en su importancia para obtener un puntaje general normalizado. Esto asegura que tanto los aspectos positivos como negativos impacten de manera justa en los resultados.

----------

### **Funcionalidad de la Aplicación**

1.  **Selección interactiva:**  
    Los usuarios pueden marcar distintos aspectos de las categorías propuestas mediante casillas de verificación (checkboxes). A medida que se seleccionan opciones, estas son evaluadas usando los valores definidos anteriormente y los factores de importancia.

2.  **Cálculo de puntajes:**  
    Al procesar las selecciones de los usuarios, la aplicación calcula un puntaje general normalizado (en una escala de 0 a 10) basado en:

    -   Valores asignados a cada criterio (muy bueno, bueno, neutro, malo, muy malo).
    -   Ponderación según la importancia de las secciones (muy importante, importante, poco importante).
    -   Valores máximos y mínimos posibles. Esto asegura que los resultados sean representados de manera equilibrada y escalada dependiendo de las selecciones hechas.
3.  **Validación de categorías:**  
    Antes de realizar los cálculos, la herramienta verifica que al menos una opción por categoría ha sido seleccionada. Si una o más categorías no tienen selección, se mostrará un mensaje de error claro solicitando completar dichas secciones.

4.  **Visualización de resultados:**

    -   Se genera un gráfico interactivo tipo línea (`Line Chart`) que muestra la distribución de los puntajes por categoría.
    -   Se incluye un indicador visual del puntaje general a través de un componente circular (`CircularProgressWithLabel`).
    -   Se detalla el puntaje individual de cada categoría, junto con los valores máximos, mínimos y el obtenido.
5.  **Exportación de datos:**  
    Los resultados obtenidos pueden exportarse a distintos formatos como CSV, JSON o Markdown para facilitar el análisis y almacenamiento de los reportes generados.


----------

### **Resumen General**

La aplicación combina la capacidad de evaluación estructurada con una interfaz visual interactiva que incluye gráficos y validación de los datos ingresados. Esto la convierte en una solución ideal para evaluar proyectos de manera objetiva, identificar áreas de oportunidad y generar reportes claros.

El sistema de asignación de valores asegura que los usuarios puedan priorizar criterios según su relevancia y evaluar los resultados de forma proporcional y justa, ayudándolos a tomar decisiones informadas sobre sus proyectos.

Gracias a la implementación en **React** y el uso de tecnologías como **Material-UI** y **Chart.js**, la herramienta no solo es funcional, sino que también proporciona una experiencia de usuario fluida y visualmente atractiva. Además, la aplicación se apoya en **TypeScript** para garantizar un desarrollo robusto y seguro.

Si buscas mejorar la evaluación de tus proyectos y obtener reportes claros y detallados mediante un análisis ponderado y normalizado, **Score-Calculator** es la solución que necesitas. 🚀