import ChannelBar from "./ChannelBar"

type Prop = {
  selectedId: number
  handleClick: (id: number) => void
}

export default function ChannelsList({ selectedId, handleClick }: Prop) {
  return (
    <div className="flex flex-col gap-2    overflow-y-scroll">
      <ChannelBar
        id={11}
        handleClick={handleClick}
        isSelected={selectedId == 11}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={12}
        handleClick={handleClick}
        isSelected={selectedId == 12}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={13}
        handleClick={handleClick}
        isSelected={selectedId == 13}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={14}
        handleClick={handleClick}
        isSelected={selectedId == 14}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={15}
        handleClick={handleClick}
        isSelected={selectedId == 15}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={16}
        handleClick={handleClick}
        isSelected={selectedId == 16}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={17}
        handleClick={handleClick}
        isSelected={selectedId == 17}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={18}
        handleClick={handleClick}
        isSelected={selectedId == 18}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
      <ChannelBar
        id={19}
        handleClick={handleClick}
        isSelected={selectedId == 19}
        channelName="MSAMN LOVERS XXL"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        time="11:55 AM"
        lastMessage="ana rachid ohibo msmn"
        unread={20}
      />
    </div>
  )
}
