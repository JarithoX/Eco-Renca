import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta) {}

  generateTags(config: { title?: string; description?: string; image?: string; url?: string } = {}) {
    const defaultTitle = 'EcoRenca - Puntos por Reciclaje';
    const defaultDesc = 'Recicla en Renca, acumula puntos y canjea increíbles recompensas. ¡Únete al cambio ecológico con EcoRenca!';
    const defaultImage = 'https://eco-renca-eta.vercel.app/assets/icon/og_share_banner.png';
    const defaultUrl = 'https://eco-renca-eta.vercel.app';

    const title = config.title ? `${config.title} | EcoRenca` : defaultTitle;
    const description = config.description || defaultDesc;
    const image = config.image || defaultImage;
    
    // Normalizar la url para que no tenga barras duplicadas
    let path = config.url || '';
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const url = path ? `${defaultUrl}/${path}` : defaultUrl;

    // Actualizar el título de la pestaña del navegador
    this.titleService.setTitle(title);

    // SEO General
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph / Facebook / Instagram / WhatsApp
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:url', content: url });

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
  }
}
