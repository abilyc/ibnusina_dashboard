import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
import { MenuItem } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../components/@material-extend';
import deleteFilled from '@iconify/icons-ant-design/delete-filled';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';

const ActionIcon = styled(Grid)(({ theme }) => ({
    zIndex: 10,
    // width: 100,
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
      label: 'Edit title',
      icon: homeFill,
      linkTo: '/#'
    },
    {
      label: 'Edit description',
      icon: personFill,
      linkTo: '/#'
    },
    {
      label: 'Edit Content',
      icon: settings2Fill,
      linkTo: '/#'
    },
    {
        label: 'Full Edit',
        icon: settings2Fill,
        linkTo: '/#'
      }
  ];


export default function ActionPopover(){
  const delRef = useRef(null);
  const editRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                onClick={handleClose}
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
