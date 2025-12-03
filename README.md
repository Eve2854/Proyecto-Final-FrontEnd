# 🛡️ Simulador de Seguro de Propiedad

Este es un proyecto de ejemplo desarrollado en React para simular el costo de diferentes opciones de cobertura de seguro basadas en las características de una propiedad y el perfil del usuario.

## 🚀 Tecnologías Utilizadas

* **Frontend:** React (usando hooks: `useState`)
* **Gestor de Proyecto:** Vite
* **Estilos:** CSS3 (Módulos/Archivo único)
* **Lenguaje:** JavaScript ES6+

## 📦 Instalación y Ejecución Local

Sigue los siguientes pasos para poner el proyecto en funcionamiento en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18+) y npm (Node Package Manager) o yarn.

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://git-scm.com/book/es/v2/Fundamentos-de-Git-Guardando-cambios-en-el-Repositorio](https://git-scm.com/book/es/v2/Fundamentos-de-Git-Guardando-cambios-en-el-Repositorio)
    # Si no usas Git, simplemente navega a la carpeta del proyecto
    ```

2.  **Instalar dependencias:**
    Navega a la carpeta raíz del proyecto e instala todas las dependencias necesarias:
    ```bash
    npm install 
    # o si usas yarn: yarn install
    ```

3.  **Ejecutar en modo desarrollo:**
    Inicia el servidor de desarrollo local.
    ```bash
    npm run dev
    # o si usas yarn: yarn dev
    ```
    El proyecto estará disponible típicamente en `http://localhost:5173/` (o el puerto que indique Vite).

## ⚙️ Estructura del Proyecto

El código principal de la aplicación reside en la carpeta `src/`.
* `src/App.jsx`: Contiene la lógica central de estados (`resultado`, `cargando`) y el renderizado de la estructura principal.
* `src/main.jsx`: Punto de entrada de React.
* `src/index.css`: Contiene todos los estilos globales y de componentes.
* `src/components/`: Almacena todos los componentes funcionales.
    * `Formulario.jsx`: Maneja el estado local del formulario, la validación y la lógica de cálculo (`cotizarSeguro`).
    * `Resultado.jsx`: Recibe y muestra las opciones de cobertura calculadas.

---

## 🌐 Fase 3: Despliegue (Punto 9)

El despliegue es el último paso para que tu proyecto sea accesible en línea.

### Tarea: Elegir y Desplegar

Recomiendo usar **Vercel** o **Netlify** por su facilidad para proyectos basados en Vite/React. Si usas GitHub:

1.  **Sube tu código a GitHub.**
2.  **Conecta Vercel/Netlify a tu repositorio de GitHub.**
3.  **Configuración de Build:** Ambas plataformas detectarán automáticamente que es un proyecto Vite/React.
    * **Comando de Build:** `npm run build`
    * **Directorio de Salida (Output Directory):** `dist`
4.  Lanza el despliegue.

---

**Pregunta de Avance:**

¿Necesitas ayuda con los ajustes de estilo (*media queries*, etc.), o prefieres que nos enfoquemos en cómo subir el proyecto a GitHub y prepararlo para el despliegue (Punto 9)?
