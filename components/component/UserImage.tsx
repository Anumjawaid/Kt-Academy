export function UserImage({user, userImage}: { user: { displayName: string }, userImage?: string }) {
    return <>
        <img className="avatar" src={userImage}/>
        <h3>{`${user.displayName}`}</h3>
    </>;
}
