App.post = App.cable.subscriptions.create "PostChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log "Conectado a PostChannel"
    setTimeout =>
      @perform "say_hi", name: 'Enmanuel'
      console.log "Envio la solicitud"
    , 10000
  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
