import PropTypes from 'prop-types';
// import { useRef } from 'react';
// import { paramCase } from 'change-case';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Icon } from '@iconify/react';
// import deleteFilled from '@iconify/icons-ant-design/delete-filled';
// import editFilled from '@iconify/icons-ant-design/edit-filled';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';

// material
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';
import ActionPopover from '../../../layouts/dashboard/ActionPopover';
// import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

// const ActionIcon = styled(Grid)(({ theme }) => ({
//   zIndex: 10,
//   // width: 100,
//   height: 30,
//   position: 'absolute',
//   borderBottomLeftRadius: 20,
//   padding:theme.spacing(0.7,0.7,4),
//   top: 0,
//   right: 0,
//   display: 'block',
//   backgroundColor: theme.palette.primary.main,
//   '& svg': {
//     color: theme.palette.grey[800],
//     zIndex:11,
//     margin: theme.spacing(0,0.5)
//   },
//   '& .MuiIconButton-sizeSmall:hover>svg': {
//     color: theme.palette.grey[600]
//   }
// }));

// const TitleStyle = styled(RouterLink)(({ theme }) => ({
//   ...theme.typography.subtitle2,
//   height: 44,
//   color: 'inherit',
//   overflow: 'hidden',
//   WebkitLineClamp: 2,
//   display: '-webkit-box',
//   WebkitBoxOrient: 'vertical',
//   textDecoration: 'none',
//   '&:hover': {
//     textDecoration: 'underline'
//   }
// }));

const StyledTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  del: PropTypes.func.isRequired
};

export default function BlogPostCard({ post, index, del}) {
  const { id, cover, title, slug, meta, author, createdAt } = post;
  // const linkTo = `${PATH_PAGE.blog}/${slug}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  // const actRef = useRef(null);

  const POST_INFO = [
    { number: meta?.comment ?? 0, icon: messageCircleFill },
    { number: meta?.view ?? 0, icon: eyeFill },
    { number: meta?.share ?? 0, icon: shareFill }
  ];

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <ActionPopover data={{id: id, title: title}} del={del} />
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={author.authorName}
            src={author.avatar}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          {/* <CoverImgStyle alt={title} src={cover} /> */}
          <CoverImgStyle alt={title} src={cover} />          
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          {/* <TitleStyle
            to={linkTo}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >dashboard
            {title}
          </TitleStyle> */}
          <StyledTitle 
            sx={{
              ...((latestPostLarge || latestPost) && 
                  {
                    // filter: 'invert(1) grayscale(1) contrast(9) drop-shadow(.05em .05em white)',
                    textShadow: '0 0 3px rgba(0,0,0,0.6)',
                    typography: 'h6', 
                    height: 60
                  })
            }}
          >
            {title}
          </StyledTitle>
            {/* <TitleEdit value={dataTitle} editOnViewClick={true} onSave={HandleSave} /> */}

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
