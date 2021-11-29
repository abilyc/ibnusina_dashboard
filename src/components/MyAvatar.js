// hooks
import { useAuth } from '../contexts/useAuth';
//
import { MAvatar } from './@material-extend';
// import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { myData } = useAuth();

  return (
    <MAvatar
      src={ myData.avatar }
      alt={ myData.avatar }
      // color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
      {...other}
    >
      {/* {createAvatar(user.displayName).name} */}
    </MAvatar>
  );
}
