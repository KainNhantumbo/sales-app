import { ShareAnchors, ShareUrls, SocialUrls } from '@/types';
import Fa from 'react-icons/fa';
import Io from 'react-icons/io5';

export function transformSocialUrls(props: ShareAnchors): ShareUrls[] {
  return [
    {
      name: 'Compartilhe no LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${props.hostname}/blog/post/${props.slug}&title=${props.title}&summary=${props.excerpt}`,
      icon: Fa.FaLinkedinIn
    },
    {
      name: 'Compartilhe no WhatsApp',
      url: `https://api.whatsapp.com/send?text=${props.title}&url=${props.hostname}/blog/post/${props.slug}`,
      icon: Fa.FaWhatsapp
    },
    {
      name: 'Compartilhe no Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${props.hostname}/blog/post/${props.slug}`,
      icon: Fa.FaFacebook
    },
    {
      name: 'Compartilhe por E-mail',
      url: `mailto:?subject=${props.title}&body=${props.hostname}/blog/post/${props.slug}`,
      icon: Io.IoMail
    },
    {
      name: 'Compartilhe no Twitter',
      url: `https://twitter.com/intent/tweet/customer-orders?text=${props.hostname}/blog/post/${props.slug}`,
      icon: Fa.FaTwitter
    },
    {
      name: 'Compartilhe no Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${props.hostname}/blog/post/${props.slug}&media=${props.hostname}/blog/post/${props.slug}&description=${props.excerpt}`,
      icon: Fa.FaPinterest
    }
  ].sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function createSocialPaths<T = SocialUrls>(data: T) {
  if (!data) return undefined;

  return Object.entries(data)
    .map(([key, value]) => {
      switch (key) {
        case 'facebook':
          return { name: 'Facebook', url: value, icon: Io.IoLogoFacebook };
        case 'instagram':
          return { name: 'Instagram', url: value, icon: Fa.FaInstagram };
        case 'website':
          return { name: 'Website', url: value, icon: Fa.FaLink };
        case 'linkedin':
          return { name: 'LinkedIn', url: value, icon: Fa.FaLinkedinIn };
        case 'whatsapp':
          return { name: 'Whatsapp', url: value, icon: Fa.FaWhatsapp };
        default:
          return undefined;
      }
    })
    .sort((a, b) => {
      if (!a || !b) return 1;
      if (a.name > b.name) return 1;
      return -1;
    });
}
