import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function ScrollDialog() {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>
        <MenuBookIcon
        color="action"
        sx={{fontSize: 30}}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Важно:</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <strong><mark>Важно соблюдать правила маркировки</mark>и правильно писать следующие элементы: "Превью", "Название", "Теги" и "Текст". Вот как правильно оформить каждый из них:<br/><mark>"Превью"</mark>: Соответствующее превью картинки на который делают обзор. Здесь вы должны предоставить краткое описание или обзор картинки, которая будет использоваться в качестве превью.<br/><mark>"Название"</mark>: "Название" должно быть написано в кавычках, и желательно указать год релиза. Также в этом поле можно указать, насколько пользователь оценивает данный объект.<br/><mark>Например:</mark><br/>"Название фильма" (2021) - Оценка: 9/10.<br/><mark>"Теги"</mark>: Теги следует разделять пробелами или запятыми. Например: тег1 тег2 тег3 или тег1, тег2, тег3. Теги помогают классифицировать и организовывать контент для удобного поиска и навигации.<br/><mark>"Текст"</mark>: Здесь вы должны предоставить понятный обзор или рекомендацию, исходя из мнения рекомендующего. Ваш текст должен быть информативным, понятным и полезным для других пользователей, которые будут читать обзор.<br/>Соблюдение этих правил маркировки и правильное оформление каждого элемента помогут создать приятное чтение для других пользователей и обеспечить более удобную навигацию и поиск на вашем сайте.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Так точно!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}