import React, { FC, useEffect, useState } from 'react';
import {
  Table,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  TableContainer,
  TableBody,
  Box,
  TablePagination,
  IconButton
} from '../../modules/share-material/material-core';
import { EditIcon } from '../../modules/share-material/material-icon';
import { EnhancedTableToolbar, EnhancedTableHead } from './enhanced-table';
import { useStyles } from './useStyles';
import {
  GetBSMerhandiseListDetail,
  EditBSMerchandise
} from '../../api/merchandise';
import {
  BackStageSearchModel,
  MerchandiseWrapper,
  MerchandiseViewModel
} from '../../models/CategoryListViewModel';
import MerchandiseListDialog from '../dialogs/merchandise-list-dialog/merchandise-list-dialog';

export interface Data {
  MerchandiseTitle: string;
  Price: number;
  RemainingQty: number;
  SoldQty: number;
}

export type Order = 'asc' | 'desc';

const MerchandiseList: FC = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('Price');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [MListOpen, setMListOpen] = useState<boolean>(false);
  const [merchandiseDetailId, setMerchandiseDetailId] = useState<string>('');
  const [backStageSearchModel, setBackStageSearchModel] = useState<
    BackStageSearchModel
  >({
    PageSize: 5,
    PageIndex: 1,
    OrderString: 'Price',
    isOrderByDesc: false
  });
  const [merchandiseList, setMerchandiseList] = useState<MerchandiseWrapper>({
    MerchandiseViewModel: [],
    MerchandiseAmount: 0
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
    setBackStageSearchModel(state => ({
      ...state,
      OrderString: property,
      isOrderByDesc: !backStageSearchModel.isOrderByDesc
    }));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);

    if (event.target.checked) {
      const newSelecteds = merchandiseList.MerchandiseViewModel.map(
        merchandise => merchandise.MerchandiseTitle
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setBackStageSearchModel(state => ({ ...state, PageIndex: newPage + 1 }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackStageSearchModel(state => ({
      ...state,
      PageSize: parseInt(event.target.value, 10)
    }));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); //return to first page
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const editMerchandise = async (merchandise: MerchandiseViewModel) => {
    const { data: response } = await EditBSMerchandise(merchandise);

    if (response.Success) {
      const itemAmount = merchandise.MerchandiseSpec.reduce(
        (prev, current) => prev + current.RemainingQty,
        0
      );
      let amountIndex = merchandiseList.MerchandiseViewModel.findIndex(
        data => data.MerchandiseId === merchandise.MerchandiseId
      );
      setMerchandiseList(state => ({
        ...state,
        ...(state.MerchandiseViewModel[amountIndex] = {
          ...state.MerchandiseViewModel[amountIndex],
          RemainingQty: itemAmount
        })
      }));
    }
  };

  useEffect(() => {
    const getBSMerhandiseListDetail = async () => {
      const { data: response } = await GetBSMerhandiseListDetail(
        backStageSearchModel
      );

      if (response.Success) {
        console.log(response.Data);
        setMerchandiseList(response.Data);
      }
    };

    getBSMerhandiseListDetail();
  }, [backStageSearchModel, setMerchandiseList]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              currentPage={page}
              rowCount={merchandiseList.MerchandiseAmount}
            />
            <TableBody>
              {merchandiseList.MerchandiseViewModel.map(
                (merchandise, index) => {
                  const isItemSelected = isSelected(
                    merchandise.MerchandiseTitle
                  );
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event =>
                        handleClick(event, merchandise.MerchandiseTitle)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={merchandise.MerchandiseId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Box style={{ display: 'inline-flex' }}>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                          <IconButton
                            color="secondary"
                            onClick={e => {
                              setMListOpen(true);
                              setMerchandiseDetailId(merchandise.MerchandiseId);
                              e.stopPropagation();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {merchandise.MerchandiseTitle}
                      </TableCell>
                      <TableCell align="right">{merchandise.Price}</TableCell>
                      <TableCell align="right">
                        {merchandise.RemainingQty}
                      </TableCell>
                      <TableCell align="right">{merchandise.SoldQty}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={merchandiseList.MerchandiseAmount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {MListOpen && (
        <MerchandiseListDialog
          isOpen={MListOpen}
          merchandiseDetailId={merchandiseDetailId}
          editMerchandise={editMerchandise}
          onClosed={() => setMListOpen(false)}
        ></MerchandiseListDialog>
      )}
    </div>
  );
};

export default MerchandiseList;
