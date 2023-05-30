import { useEffect, useMemo } from 'react'
import BeePlugin from '@mailupinc/bee-plugin'
import { IBeeConfig, IMergeContent, IMergeTag, ISpecialLink } from '@mailupinc/bee-plugin/dist/types/bee'
// import './custom.css'

const BEE_TEMPLATE_URL = 'https://rsrc.getbee.io/api/templates/m-bee'
const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

const BEE_PLUGIN_CONTAINER_ID = 'bee-plugin-container'

const specialLinks: ISpecialLink[] = [
  {
    type: 'unsubscribe',
    label: 'SpecialLink.Unsubscribe',
    link: 'http://[unsubscribe]/',
  },
  {
    type: 'subscribe',
    label: 'SpecialLink.Subscribe',
    link: 'http://[subscribe]/',
  },
]
const mergeTags: IMergeTag[] = [
  {
    name: 'tag 1',
    value: '[tag1]',
  },
  {
    name: 'tag 2',
    value: '[tag2]',
  },
]
const mergeContents: IMergeContent[] = [
  {
    name: 'content 1',
    value: '[content1]',
  },
  {
    name: 'content 2',
    value: '[content1]',
  },
]

const userInput = (message: string, sample: any) =>
  function handler(resolve: any, reject: any) {
    const data = prompt(message, JSON.stringify(sample))
    return data == null || data === '' ? reject() : resolve(JSON.parse(data))
  }

const contentDialog = {
  filePicker: {
    label: 'Picker',
    handler: userInput('Enter image path:', {
      url: 'https://d1oco4z2z1fhwp.cloudfront.net/templates/default/113/rocket-color.png',
    }),
  },
}

function EmailBuilder(props: any) {
  const beeConfig: IBeeConfig = useMemo(
    () => ({
      uid: 'test1-clientside',
      container: BEE_PLUGIN_CONTAINER_ID,
      username: 'Test User',
      userColor: '#00aba5',
      commenting: true,
      userHandle: '2468',
      autosave: 15,
      language: 'en-US',
      specialLinks,
      mergeTags,
      mergeContents,
      contentDialog,
      contentDefaults: {
        button: {
          label: 'My New Label',
          href: 'http://www.google.com',
          width: '35%',
          styles: {
            color: '#ffffff',
            fontSize: '22px',
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            backgroundColor: '#FF819C',
            borderBottom: '0px solid transparent',
            borderLeft: '0px solid transparent',
            borderRadius: '25px',
            borderRight: '0px solid transparent',
            borderTop: '0px solid transparent',
            lineHeight: '200%',
            maxWidth: '100%',
            paddingBottom: '5px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '5px',
          },
          blockOptions: {
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            align: 'center',
            hideContentOnMobile: true,
          },
          mobileStyles: {
            paddingBottom: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '10px',
            textAlign: 'center',
            fontSize: '40px',
          },
        },
        // buttonsOptions: { ... },
        image: {
          alt: 'My Alt Label',
          href: 'http://www.google.com',
          src: 'https://www.google.com/search?q=justgo+image&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj53Lmvq-z6AhW8cGwGHbCzDPoQ_AUoAXoECAIQAw&biw=1920&bih=961&dpr=1#imgrc=Xe9B15fGMYa7eM',
          width: '250px', // optional - 100% default
          blockOptions: {
            paddingBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            align: 'center',
            hideContentOnMobile: true,
          },
          mobileStyles: {
            textAlign: 'right',
            paddingTop: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
            paddingLeft: '10px',
          },
        },
        text: {
          html: 'This is default text for block...',
          styles: {
            color: '#e63c60',
            linkColor: '#e63c60',
            fontSize: '22px',
            lineHeight: '200%',
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
          },
          blockOptions: {
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            hideContentOnMobile: true,
          },
          mobileStyles: {
            paddingTop: '30px',
            paddingRight: '30px',
            paddingBottom: '30px',
            paddingLeft: '30px',
          },
        },
        divider: {
          width: '50%',
          line: '10px solid #BBBBBB',
          align: 'right',
          blockOptions: {
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            hideContentOnMobile: true,
          },
          mobileStyles: {
            align: 'left',
            paddingLeft: '10px',
            paddingRight: '10px',
          },
        },
        // social: {
        //   icons: [
        //     {
        //       type: 'custom',
        //       name: 'Facebook',
        //       image: {
        //         prefix: 'https://www.facebook.com/',
        //         alt: 'Facebook',
        //         src: `https://img.icons8.com/dusk/64/000000/facebook-new--v2.png`,
        //         title: 'Facebook',
        //         href: 'https://www.facebook.com/',
        //       },
        //       text: '',
        //     },
        //   ],
        //   blockOptions: {
        //     paddingBottom: '20px',
        //     paddingLeft: '20px',
        //     paddingRight: '20px',
        //     paddingTop: '20px',
        //     textAlign: 'center',
        //     hideContentOnMobile: true,
        //     height: 57,
        //     width: 151,
        //     iconWidth: 32,
        //   },
        //   mobileStyles: {
        //     textAlign: 'right',
        //     paddingTop: '10px',
        //     paddingRight: '10px',
        //     paddingBottom: '10px',
        //     paddingLeft: '10px',
        //   },
        // },

        // // dynamicContent: { ... },
        video: {
          blockOptions: {
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            hideContentOnMobile: true,
          },
          mobileStyles: {
            paddingTop: '40px',
            paddingRight: '40px',
            paddingBottom: '40px',
            paddingLeft: '40px',
          },
        },
        // general: { ... },
        // form: { ... },
        menu: {
          items: [
            {
              text: 'Contact us',
              link: {
                href: 'https://www.acme.com/contact-us',
                title: 'Contact us',
                target: '_blank',
              },
            },
          ],
          style: {
            color: '#000000',
            linkColor: '#0068A5',
            fontSize: '14px',
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
          },
          hamburger: {
            mobile: false,
            foregroundColor: '#ffffff',
            backgroundColor: '#000000',
            iconSize: '36px',
            iconType: 'normal', // or "rounded"
          },
          blockOptions: {
            align: 'center',
            paddingBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            hideContentOnMobile: true,
            hideContentOnDesktop: false,
          },
          itemsSpacing: {
            paddingBottom: '5px',
            paddingLeft: '5px',
            paddingRight: '5px',
            paddingTop: '5px',
          },
          mobileStyles: {
            textAlign: 'right',
            fontSize: '50px',
            paddingTop: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
            paddingLeft: '10px',
          },
        },
        // customCss: {

        // }
      },
      defaultModulesOrder: ['Icons', 'Button', 'Html', 'Video'],
      onSave: (_, htmlFile) => {
        console.log('newsletter-template.html', htmlFile)
        props.onChangeFunction(htmlFile)
      },
      onLoad: () => console.warn('*** [integration] loading a new template...'),
      onSaveAsTemplate: (json: Record<string, unknown>) => console.log('newsletter-template.json', json),
      onAutoSave: (jsonFile) => {
        console.log(`${new Date().toISOString()} autosaving...,`, jsonFile)
      },
      onSend: (htmlFile) => console.log('onSend', htmlFile),
      onError: (errorMessage) => console.log('onError ', errorMessage),
      onChange: (msg, response) => console.warn('*** [integration] (OnChange) message --> ', msg, response),
      onWarning: (e) => console.warn('*** [integration] (OnWarning) message --> ', e.message),
      onPreview: () => console.warn('*** [integration] --> (onPreview) '),
      onTogglePreview: () => console.warn('*** [integration] --> (onTogglePreview) '),
      onSessionStarted: (sessionInfo) => {
        console.warn('*** [integration] --> (onSessionStarted) ', sessionInfo)
        prompt('press ctrl+c to copy the session ID', sessionInfo.sessionId)
      },
      onSessionChange: (sessionInfo) => console.warn('*** [integration] --> (onSessionChange) ', sessionInfo),
    }),
    []
  )

  useEffect(() => {
    const beeTest = new BeePlugin()
    const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }
    beeTest
      .getToken('f5e9c3ad-c019-4430-a1e7-81eaa7ef5a8f', 'EkxST0FIVLCk1hy77QvEi09OxwXh5f9Zo9cysIK4qkLJrP4tJPKy', conf)
      .then(() => fetch(new Request(BEE_TEMPLATE_URL, { method: 'GET' })))
      .then((res) => res.json())
      .then((template) => {
        beeTest
          .start(beeConfig, template, '', { shared: false })
          .then((instance) => console.log('promise resolve return instance', instance))
      })
      .catch((error) => console.error('error during iniziatialization --> ', error))
  }, [beeConfig])

  return <div id={BEE_PLUGIN_CONTAINER_ID} className="BeePluginContainer" />
}

export default EmailBuilder
