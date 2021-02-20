import React, { Fragment, useEffect, useState } from 'react';
import styles from './Footer.module.scss'
import { FaLocationArrow, FaPhone, FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaTwitter, FaMailBulk } from 'react-icons/fa';
import { AiOutlineSchedule } from 'react-icons/ai';
import { PbyService } from '../../services/pby-services';
import TermsAndConditionsModal from '../termsAndConditionsModal/termsAndConditionsModal';


const Footer = ({ dataCompany }) => {

  // const [footerData, setFooterData] = useState({})

  const [socialNetworks, setSocialNetworks] = useState<any[]>([])
  const [footerMenu, setFooterMenu] = useState<any[]>([])
  const [showTermsConditionsModal, setShowTermsConditionsModal] = useState<boolean>(false)
  const [contentTerms, setContentTerms] = useState<String>('')

  useEffect(() => {
    getFooterData()
    getFooter()
  }, [])

  const getFooter = () => {
    PbyService.getFooterMenu().then(data => {
      if (!data) return
      setFooterMenu(data)
    })
  }

  const getFooterData = () => {
    PbyService.getSocialNetwork().then(data => {
      if (!data) return
      setSocialNetworks(data)
    })
  }

  const openSocialNetwork = (path: string) => {
    if (!path) return
    window.open(path);
  }

  const handleTermsClick = (content) => {
    setShowTermsConditionsModal(true)
    setContentTerms(content)
  }

  return (
    <Fragment>
      <TermsAndConditionsModal show={showTermsConditionsModal}
        onClosed={() => setShowTermsConditionsModal(false)}
        openRegisterModal={() => setShowTermsConditionsModal(true)} content={contentTerms} />
      {/* Redes Sociales */}
      <section className={styles.social_networks_container}>
        <div className={styles.social_content}>
          <div className={styles.info}>
            <div className={styles.content_info}>
              <div className={styles.icon_content}>
                <FaLocationArrow size="1.4em" />
              </div>
              <p className={styles.text}>{dataCompany.Direccion}</p>
            </div>
            <div className={styles.content_info}>
              <div className={styles.icon_content}>
                <AiOutlineSchedule size="1.4em" />
              </div>
              <div>
                {dataCompany.Horario}
              </div>
            </div>
            <div className={styles.content_info}>
              <div className={styles.icon_content}>
                <FaMailBulk size="1.4em" />
              </div>
              <p>{dataCompany.Email}</p>
            </div>
            <div className={styles.content_info}>
              <div className={styles.icon_content}>
                <FaPhone size="1.4em" />
              </div>
              <p>{dataCompany.Telelfono}</p>
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.icons}>
              {socialNetworks.map((item, i) => {
                if (item.Name === 'Facebook')
                  return (<FaFacebookF key={i} onClick={() => openSocialNetwork(item.URL)} />)
                if (item.Name === 'Instagram')
                  return (<FaInstagram key={i} onClick={() => openSocialNetwork(item.URL)} />)
                if (item.Name === 'Pinterest')
                  return (<FaPinterestP key={i} onClick={() => openSocialNetwork(item.URL)} />)
                if (item.Name === 'Youtube')
                  return (<FaYoutube key={i} onClick={() => openSocialNetwork(item.URL)} />)
                if (item.Name === 'Twitter')
                  return (<FaTwitter key={i} onClick={() => openSocialNetwork(item.URL)} />)
                return null
              }
              )}
              {/* <FaFacebookF /><FaInstagram /><FaPinterestP /><FaYoutube /><FaTwitter /> */}
            </div>

            <div className={styles.text_contact}>
              {(footerMenu || []).map((item, i) => (
                <p key={i} onClick={() => handleTermsClick(item.Content)}>
                  <span>{item.Name}</span>
                </p>
              ))}
            </div>

          </div>
          <div className={styles.logo}>
            <img src={dataCompany.Logo} alt="" />
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footer_content}>
          <span>© 2020 by PBY Proudly created Softeam Design</span>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer;
