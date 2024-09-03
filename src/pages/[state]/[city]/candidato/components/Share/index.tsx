import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon
} from 'next-share'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

export const ShareCandidate = () => {
  const { asPath } = useRouter()
  const url = 'https://omeuvoto.com.br' + asPath

  return (
    <div className={styles.container}>
      <p>Compartilhe em:</p>
      <div>
        <FacebookShareButton url={url}>
          <FacebookIcon size={20} borderRadius={10} />
        </FacebookShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={20} borderRadius={10} />
        </WhatsappShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon size={20} borderRadius={10} />
        </TelegramShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={20} borderRadius={10} />
        </TwitterShareButton>
        <EmailShareButton url={url}>
          <EmailIcon size={20} borderRadius={10} />
        </EmailShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={20} borderRadius={10} />
        </LinkedinShareButton>
      </div>
    </div>
  )
}
