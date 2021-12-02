import { useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
import { MenuItem } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../components/@material-extend';
import deleteFilled from '@iconify/icons-ant-design/delete-filled';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import editTwotone from '@iconify/icons-ant-design/edit-twotone';
import { PATH_BLOG } from '../../routes/paths';

const ActionIcon = styled(Grid)(({ theme }) => ({
    zIndex: 10,
    height: 30,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    padding:theme.spacing(0.7,0.7,4),
    top: 0,
    right: 0,
    display: 'block',
    backgroundColor: theme.palette.primary.main,
    '& button': {
        zIndex: 100
    },
    '& svg': {
      color: theme.palette.grey[800],
      margin: theme.spacing(0,0.5)
    },
    '& .MuiIconButton-sizeSmall:hover>svg': {
      color: theme.palette.grey[600]
    }
  }
));


const MENU_OPTIONS = [
    {
        label: 'Edit Title',
        val: 'title',
        icon: editTwotone,
        linkTo: '#'
    },
    {
        label: 'Edit Description',
        val: 'summary',
        icon: editTwotone,
        linkTo: '#'
    },
    {
        label: 'Edit Content',
        val: 'content',
        icon: editTwotone,
        linkTo: '#'
    },
    {
        label: 'Full Edit',
        val: 'full',
        icon: editFilled,
        linkTo: '#'
      }
  ];


export default function ActionPopover(props){
  const delRef = useRef(null);
  const editRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const handleEdit = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editFunct = (type) => {
    setOpen(false);
    const to = `${PATH_BLOG.root}/edit`;
    const {id, title} = props.data;
    navigate(to, {state:{id: id, title: title, type: type}});
  };

    return (
    <>
        <Grid container>
            <ActionIcon item>
                <MIconButton id='edit' ref={editRef} onClick={handleEdit} size='small'>
                    <Icon icon={editFilled} fontSize='small'/>
                </MIconButton>
                <MIconButton id='delete' ref={delRef} size='small'>
                    <Icon icon={deleteFilled} fontSize='small'/>
                </MIconButton>
            </ActionIcon>
        </Grid>

        <MenuPopover open={open} onClose={handleClose} anchorEl={editRef.current} sx={{widh: 220}}>
            {MENU_OPTIONS.map((option) => (
                <MenuItem
                    key={option.label}
                    // to={option.linkTo}
                    // component={RouterLink}
                    onClick={()=>{editFunct(option.val)}}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                >
                    <Box
                    component={Icon}
                    icon={option.icon}
                    sx={{
                        mr: 2,
                        width: 24,
                        height: 24
                    }}
                    />

                    {option.label}
                </MenuItem>
            ))}
        </MenuPopover>
    
    </>
    )

}
