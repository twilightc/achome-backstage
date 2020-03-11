import React, { FC, useEffect, useState } from 'react';
import {
  Table,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  TableContainer,
  TableBody,
  TablePagination
} from '../../modules/share-material/material-core';
import { EnhancedTableToolbar, EnhancedTableHead } from './enhanced-table';
import { useStyles } from './useStyles';
import { GetBSMerhandiseListDetail } from '../../api/merchandise';
import {
  BackStageSearchModel,
  MerchandiseWrapper
} from '../../models/CategoryListViewModel';

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

  useEffect(() => {
    const getBSMerhandiseListDetail = async () => {
      const { data: response } = await GetBSMerhandiseListDetail(
        backStageSearchModel
      );

      if (response.Success) {
        setMerchandiseList(response.Data);
      }
    };

    getBSMerhandiseListDetail();
  }, [backStageSearchModel]);

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
              rowCount={rowsPerPage}
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
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
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
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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
    </div>
  );
};

export default MerchandiseList;
