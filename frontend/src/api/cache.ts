type CacheOptions = {
    cacheControl?: string;
    expires?: Date;
  };
  
  export const setCacheHeaders = (res: any, options: CacheOptions = {}) => {
    const { cacheControl = 'public, max-age=31536000, immutable', expires } = options;
  
    // Configura la caché en el encabezado de respuesta
    res.setHeader('Cache-Control', cacheControl);
  
    if (expires) {
      res.setHeader('Expires', expires.toUTCString());
    }
  };
  
  // Ejemplo de uso en una API de Next.js
  export const cacheApiResponse = (res: any, data: any, options: CacheOptions = {}) => {
    setCacheHeaders(res, options);
    res.status(200).json(data);
  };
  