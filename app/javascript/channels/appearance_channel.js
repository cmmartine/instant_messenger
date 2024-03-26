import consumer from "./consumer"

consumer.subscriptions.create({ channel: "AppearanceChannel" }, {
  // Called once when the subscription is created.
  initialized() {
    console.log("Connected to appearance channel")
    this.update = this.update.bind(this)
    this.update()
  },

  update() {
    this.documentIsActive ? this.appear() : this.away()
  },

  appear() {
    // Calls `AppearanceChannel#appear(data)` on the server.
    this.perform("appear")
  },

  away() {
    // Calls `AppearanceChannel#away` on the server.
    this.perform("away")
  },

  get documentIsActive() {
    return document.visibilityState === "visible" && document.hasFocus()
  },

  get appearingOn() {
    console.log('appearing on')
    const userDiv = document.getElementById(`Alfred`);
    if (userDiv) {
      userDiv.classList.add("online");
    }
  }
})
