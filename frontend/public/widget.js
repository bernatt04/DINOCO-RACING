// frontend/public/widget.js

(function() {
    // Obtener la configuración desde window.widgetConfig
    const configUrl = window.widgetConfig;
  
    if (!configUrl) {
      console.error('No se proporcionó la URL de configuración del widget.');
      return;
    }
  
    // Función para cargar la configuración
    async function loadConfig(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('No se pudo cargar la configuración del widget.');
        }
        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    // Función para crear el widget
    function createWidget(config) {
      // Crear el contenedor del widget
      const widgetContainer = document.createElement('div');
      widgetContainer.id = 'mi-widget-de-chat';
      widgetContainer.style.position = 'fixed';
      widgetContainer.style.bottom = '20px';
      widgetContainer.style.right = config.position === 'right' ? '20px' : 'auto';
      widgetContainer.style.left = config.position === 'left' ? '20px' : 'auto';
      widgetContainer.style.width = `${config.width}px`;
      widgetContainer.style.height = `${config.height}px`;
      widgetContainer.style.zIndex = '10000';
      widgetContainer.style.border = 'none';
  
      // Crear el iframe para el widget
      const iframe = document.createElement('iframe');
      iframe.src = `https://localhost:3000/render-widget?config=${encodeURIComponent(configUrl)}`;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
  
      widgetContainer.appendChild(iframe);
      document.body.appendChild(widgetContainer);
    }
  
    // Cargar la configuración y crear el widget
    loadConfig(configUrl).then(config => {
      if (config) {
        createWidget(config);
      }
    });
  })();
  