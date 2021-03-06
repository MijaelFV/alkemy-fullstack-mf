import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { EntryContext } from "../../context/entry/EntryContext";
import { UiContext } from "../../context/ui/UiContext";
import { format } from "../../utils/currency";

export const EntryCard = ({entry}) => {

  const {toggleDrawer} = useContext(UiContext)
  const {selectEntry} = useContext(EntryContext)

  const handleEntryClick = () => {
    selectEntry(entry)
    toggleDrawer()
  }

  return (
    <Grid item className="fadeIn"> 
      <Card>
        <CardActionArea onClick={handleEntryClick} sx={{display: 'flex', py:1, px: 2}}>
          {
            entry.type === 'expense'
            ? <ArrowDropDown sx={{height: 40, width: 40, ml: -2, color: "red"}} />
            : <ArrowDropUp sx={{height: 40, width: 40, ml: -2, color: "green"}} />
          }
          <Box sx={{display: 'flex', flexDirection:"column", flex: '1 0 auto'}}>
              <Typography fontWeight={500}>{entry.concept}</Typography>
              <Typography variant="subtitle2" fontWeight={500} color="gray">{entry.Category.name}</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection:"column", textAlign: 'end'}}>
            <Typography variant="body1" fontWeight={600} color={entry.type === 'expense' ? 'red' : 'green'}>{entry.type === 'expense' ? `-${format(entry.amount)}` : format(entry.amount)}</Typography>
            <Typography variant="subtitle2" fontWeight={500} color="gray">{entry.date}</Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
