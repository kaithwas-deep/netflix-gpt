const VideoTitle = ({title, overview}) => {
    return (
        <div className="absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
            <h1 className="font-bold text-4xl pt-72 px-14">{title}</h1>
            <h2 className="font-semibold text-sm px-14 pt-3 w-1/3">{overview}</h2>
            <div className="pl-14 mt-4">
                <button className="bg-gray-500 py-2 px-8 font-bold text-lg text-white rounded-md bg-opacity-50 hover:bg-gray-200 hover:text-black">Play</button>
                <button className="bg-gray-500 py-2 px-8 font-bold text-lg text-white rounded-md ml-4 bg-opacity-50 hover:bg-gray-200 hover:text-black">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;