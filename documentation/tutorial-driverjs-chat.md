# Tutorial: tour guiado con Driver.js en el Chat (y explicación de Modelos + Tools)

Este tutorial documenta cómo está implementado el tour guiado del Chat con **Driver.js** y cómo se conecta con:

- **Cambio de modelo Gemini** (dropdown del header)
- **Tools del input** (dropdown que inserta prompts en el textarea)

> Contexto: app React + Vite. Driver.js ya está instalado en `package.json`.

---

## 1) Qué problema resuelve Driver.js aquí

Driver.js te permite guiar al usuario por partes clave del chat, resaltando elementos del DOM y mostrando popovers (título + descripción) por pasos.

En este chat el tour apunta a tres zonas:

- Header del chat
- Contenedor de mensajes
- Zona de input

---

## 2) Requisitos

### Dependencia

Ya la tienes instalada:

- `driver.js`

Si en algún proyecto no lo estuviera:

```bash
npm i driver.js
```

### CSS

Driver.js necesita sus estilos para que se vea el overlay y el popover:

```ts
import "driver.js/dist/driver.css";
```

En este proyecto está importado dentro del archivo del tour (ver sección 3).

---

## 3) Crear el tour (configuración)

Archivo: `src/features/chatbot/chat/tour/chatTour.ts`

Puntos clave del config:

- `showProgress`: muestra el indicador de progreso.
- `allowClose`: permite cerrar el tour.
- `steps`: lista de pasos; cada paso referencia un selector de DOM (`element`) y define el `popover`.

Ejemplo (igual a lo que tienes):

```ts
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const chatTour = driver({
  showProgress: true,
  animate: true,
  allowClose: true,

  steps: [
    {
      element: ".chat-header",
      popover: {
        title: "Chat IA",
        description: "Aquí puedes interactuar con el asistente.",
        side: "bottom",
      },
    },
    {
      element: ".chat-messages",
      popover: {
        title: "Mensajes",
        description: "Aquí aparecerán las respuestas generadas.",
        side: "left",
      },
    },
    {
      element: ".chat-input",
      popover: {
        title: "Escribe un mensaje",
        description: "Pregunta algo relacionado con facturación.",
        side: "top",
      },
    },
  ],
});
```

### Nota importante: los selectores deben existir

Los `element: ".chat-..."` apuntan a clases CSS reales dentro de la UI. Si renombraras esas clases o cambias la estructura, el tour dejaría de encontrar el target.

---

## 4) Marcar los targets en la UI (clases)

Archivo: `src/features/chatbot/chat/pages/ChatPage.tsx`

En el render del chat, envuelves cada zona con un `div` con una clase estable:

```tsx
<div className="chat-header">
  <Header />
</div>

<div className="chat-messages">
  <Messages isPending={isPending} messages={messages} />
</div>

<div className="chat-input">
  <ChatInput
    value={text}
    onChange={setText}
    onSubmit={handleOnClick}
    disabled={emptyTextInput || isPending}
  />
</div>
```

Eso es lo que “engancha” con el archivo del tour.

---

## 5) Ejecutar el tour al entrar (useEffect + localStorage)

Archivo: `src/features/chatbot/chat/pages/ChatPage.tsx`

La idea es:

- Revisar si ya se mostró (`localStorage`).
- Si no se mostró, arrancar `chatTour.drive()`.
- Guardar la marca para no repetirlo.

Ejemplo (igual a tu implementación):

```ts
useEffect(() => {
  const alreadySeen = localStorage.getItem("chat-tour");

  if (!alreadySeen) {
    setTimeout(() => {
      chatTour.drive();
    }, 500);

    localStorage.setItem("chat-tour", "true");
  }
}, []);
```

### Por qué hay `setTimeout(500)`

Porque el tour necesita que los elementos del DOM ya existan y estén pintados. En UIs con animaciones/layouts, a veces conviene dar un pequeño margen.

### Cómo “resetear” el tour

En desarrollo puedes borrar la marca:

- `localStorage.removeItem("chat-tour")`

---

## 6) Explicar el cambio de modelo (GeminiModelDropdown)

### Qué hace

El dropdown de modelos permite cambiar globalmente qué modelo Gemini usará la app cuando el usuario envía un mensaje.

Archivos clave:

- `src/features/chatbot/chat/components/GeminiModelDropdown.tsx`
- `src/features/chatbot/chat/store/geminiModel.store` (Zustand)
- `src/features/chatbot/chat/pages/ChatPage.tsx` (consume el modelo al llamar al API)

### Flujo

1) El usuario elige un modelo en el dropdown.
2) Se actualiza el estado global (Zustand) con `setModel(item)`.
3) `ChatPage` lee el modelo actual con `useGeminiModel()`.
4) En la llamada al API, se manda `model.id` como `modelGemini`.

Fragmentos relevantes:

**Seleccionar modelo**:

```tsx
// GeminiModelDropdown.tsx
onClick={() => setModel(item)}
```

**Usar modelo en API**:

```ts
// ChatPage.tsx
const { model } = useGeminiModel();

const response = await facturacionService.chat({
  message: value,
  modelGemini: model.id,
});
```

### Ventaja de este diseño

El selector de modelo queda desacoplado del envío del mensaje:

- Header controla UI/selección
- ChatPage controla el envío
- La conexión se hace por el store global

---

## 7) Explicar las “Tools” del input (ToolsDropdown)

### Qué hace

El dropdown de tools inserta prompts predefinidos en el input (textarea). No envía el mensaje automáticamente: solo “te ayuda a escribir más rápido”.

Archivos clave:

- `src/features/chatbot/chat/components/ToolsDropdown.tsx`
- `src/features/chatbot/chat/store/chatInput.store` (Zustand)
- `src/features/chatbot/chat/components/ChatInput.tsx` (render del textarea)

### Flujo

1) El usuario abre el dropdown de tools.
2) Clic en una opción.
3) `ToolsDropdown` ejecuta `setText(prompt)`.
4) Como `ChatPage` pasa `text` al componente `ChatInput`, el textarea se rellena inmediatamente.

Fragmentos relevantes:

```ts
// ToolsDropdown.tsx
const { setText } = useChatInputStore();

const handleClickItem = (value: string): void => {
  setText(value);
};
```

```tsx
// ChatPage.tsx
const { text, setText } = useChatInputStore();

<ChatInput value={text} onChange={setText} ... />
```

---

## 8) Resumen final (para explicarlo en una demo)

- Driver.js apunta a tres zonas del chat por clases (`.chat-header`, `.chat-messages`, `.chat-input`).
- El tour se inicia una vez por usuario usando `localStorage`.
- El modelo Gemini se cambia en el header y viaja al envío del chat por Zustand.
- Las tools del input escriben prompts en el textarea por Zustand (no envían).
