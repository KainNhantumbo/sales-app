import {
  FaFacebook,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
import type { ShareUrls } from '../../@types';

interface IProps {
  slug: string;
  title: string;
  hostname: string;
  excerpt: string;
}

export function shareUrls(props: IProps): ShareUrls[] {
  return [
    {
      name: 'Compartilhe no LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${props.hostname}/blog/post/${props.slug}&title=${props.title}&summary=${props.excerpt}`,
      icon: FaLinkedinIn,
    },
    {
      name: 'Compartilhe no Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${props.hostname}/blog/post/${props.slug}`,
      icon: FaFacebook,
    },
    {
      name: 'Compartilhe no Twitter',
      url: `https://twitter.com/intent/tweet?text=${props.hostname}/blog/post/${props.slug}`,
      icon: FaTwitter,
    },
    {
      name: 'Compartilhe no Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${props.hostname}/blog/post/${props.slug}&media=${props.hostname}/blog/post/${props.slug}&description=${props.excerpt}`,
      icon: FaPinterest,
    },
  ];
}
