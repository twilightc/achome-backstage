import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '../../../modules/share-material/material-core';
import { useStyles } from './useStyles';
import { MerchandiseViewModel } from '../../../models/CategoryListViewModel';
import { development } from '../../../environments/development';
import { GetMerchandise } from '../../../api/merchandise';
import ConfirmDialogScaffold from '../confirm-dialog-scaffold/confirm-dialog-scaffold';

interface Iprops {
  isOpen: boolean;
  merchandiseDetailId: string;
  editMerchandise: (merchandise: MerchandiseViewModel) => void;
  onClosed: () => void;
}

const MerchandiseListDialog: FC<Iprops> = ({
  isOpen,
  merchandiseDetailId,
  editMerchandise,
  onClosed
}) => {
  const classes = useStyles();
  const [merchandiseInfo, setMerchandiseInfo] = useState<MerchandiseViewModel>({
    MerchandiseId: '',
    OwnerAccount: '',
    MerchandiseTitle: '',
    MerchandiseContent: '',
    SoldQty: 0,
    RemainingQty: 0,
    CategoryId: '',
    CategoryDetailId: '',
    ImagePath: '',
    Price: 0,
    EnableSpec: false,
    MerchandiseSpec: [],
    MerchandiseQa: [],
    Spec1: [],
    Spec2: []
  });
  const [editConfirmDialog, setEditConfirmDialog] = useState<boolean>(false);
  const [onCloseConfirmDialog, setOnCloseConfirmDialog] = useState<boolean>(
    false
  );

  useEffect(() => {
    const getMerchandise = async () => {
      const { data: response } = await GetMerchandise(merchandiseDetailId);

      if (response) {
        setMerchandiseInfo(response.Data);
        console.log(response.Data);
      }
    };

    getMerchandise();
  }, [merchandiseDetailId]);

  return (
    <div className={classes.root}>
      <Dialog
        open={isOpen}
        onClose={() => {
          console.log('setOnCloseConfirmDialog');
          console.log(onCloseConfirmDialog);
          setOnCloseConfirmDialog(true);
        }}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="form-dialog-title">修改商品內容</DialogTitle>
        <DialogContent>
          {merchandiseInfo && (
            <Box className={classes.itemInfo}>
              <Box className={classes.itemImage}>
                <img
                  style={{ maxWidth: '400px', maxHeight: '400px' }}
                  src={`${development.imgUrl}/${merchandiseInfo.ImagePath}`}
                  alt="itemImg"
                />
              </Box>
              <TextField
                label="商品名稱"
                placeholder="請在此修改商品名稱.."
                variant="outlined"
                style={{ margin: '10px' }}
                value={merchandiseInfo.MerchandiseTitle}
                onChange={e => {
                  setMerchandiseInfo({
                    ...merchandiseInfo,
                    MerchandiseTitle: e.target.value
                  });
                }}
              />
              <TextField
                name="yee"
                label="商品細節"
                placeholder="請在此輸入商品細節.."
                multiline
                rowsMax="4"
                variant="outlined"
                style={{ margin: '10px' }}
                value={merchandiseInfo.MerchandiseContent}
                onChange={e => {
                  setMerchandiseInfo({
                    ...merchandiseInfo,
                    MerchandiseContent: e.target.value
                  });
                }}
              />
              <TextField
                label="價錢"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                style={{ margin: '10px' }}
                value={merchandiseInfo.Price}
                onChange={e => {
                  setMerchandiseInfo({
                    ...merchandiseInfo,
                    Price: +e.target.value
                  });
                }}
              />
              <TextField
                disabled={merchandiseInfo.MerchandiseSpec.length !== 0}
                label="商品目前數量"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                value={merchandiseInfo.RemainingQty}
                onChange={e => {
                  setMerchandiseInfo({
                    ...merchandiseInfo,
                    RemainingQty: +e.target.value
                  });
                }}
                variant="outlined"
                style={{ margin: '10px' }}
              />

              {merchandiseInfo.MerchandiseSpec.map((spec, specIndex) => (
                <TextField
                  key={spec.Spec1 + spec.Spec2}
                  label={`規格:${spec.Spec1} | ${spec.Spec2}`}
                  disabled={!spec.Enable}
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={spec.RemainingQty}
                  onChange={e => {
                    setMerchandiseInfo({
                      ...merchandiseInfo,
                      MerchandiseSpec: merchandiseInfo.MerchandiseSpec.map(
                        (item, index) => {
                          if (specIndex === index) {
                            return {
                              ...item,
                              RemainingQty: +e.target.value
                            };
                          } else {
                            return item;
                          }
                        }
                      )
                    });
                  }}
                  variant="outlined"
                  style={{ margin: '10px' }}
                />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClosed()} color="primary">
            取消修改
          </Button>
          <Button
            onClick={() => {
              setEditConfirmDialog(true);
            }}
            color="primary"
          >
            修改完成
          </Button>
        </DialogActions>
      </Dialog>
      {editConfirmDialog && (
        <ConfirmDialogScaffold
          isOpen={editConfirmDialog}
          titleText={'修改前提醒'}
          onConfirm={() => {
            setEditConfirmDialog(true);
            editMerchandise(merchandiseInfo);
            onClosed();
          }}
          onClosed={() => {
            setEditConfirmDialog(false);
          }}
        ></ConfirmDialogScaffold>
      )}
      {onCloseConfirmDialog && (
        <ConfirmDialogScaffold
          isOpen={onCloseConfirmDialog}
          titleText={'關閉編輯畫面'}
          onConfirm={() => {
            setOnCloseConfirmDialog(false);
            onClosed();
          }}
          onClosed={() => setOnCloseConfirmDialog(false)}
        ></ConfirmDialogScaffold>
      )}
    </div>
  );
};

export default MerchandiseListDialog;
