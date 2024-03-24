const Notification = ({message, res}) => {
    const notificationStyle = {
        color: (res ? 'green' : 'red'),
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    } else {
        return (
            <div style = {notificationStyle}>
                {message}
            </div>
        )
    }
}

export default Notification