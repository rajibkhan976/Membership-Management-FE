export function signinServices(view, ssoMode, callback) {
  return {
    fire: () => {
      if (window.parent.az) {
        window.parent.az.PortalSignupManager.get().startSignupResonsive({
          view: view,
          afterLogin: function (user) {
            callback()
            // me.fireEvent('successlogin', user)
          },
        })
      }
    },
  }
}
