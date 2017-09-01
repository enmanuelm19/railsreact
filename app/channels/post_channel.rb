class PostChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "posts"
  end

  def say_hi(data)
    puts "\n\n\n Hola #{data['name']} esto es una peticion del cliente \n\n\n"
  end
  
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
