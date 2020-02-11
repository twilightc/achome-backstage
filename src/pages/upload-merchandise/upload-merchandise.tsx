/* eslint-disable no-sequences */
import React, { FC, useCallback, useState, useEffect } from 'react';
import useStyles from './useStyles';
import cuid from 'cuid';
import { Switch, Button } from '../../modules/share-material/material-core';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import { GetCategoryList } from '../../api/merchandise';
import { CategoryListViewModel } from '../../models/CategoryListViewModel';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Addmerchandise } from '../../api/upload';
import {
  AddMerchandiseModel,
  AddSpecModel
} from '../../models/AddMerchandiseModel';
import {
  Dropzone,
  ImageList
} from '../../components/preview-upload-image/preview-upload-image';

interface Image {
  id: string;
  src: string;
}

const UploadMerchandisePage: FC = () => {
  const classes = useStyles();
  const [images, setImages] = useState<Image[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryListViewModel[]>([]);
  const [spec1, setSpec1] = useState<string>('');
  const [spec2, setSpec2] = useState<string>('');
  const [newItem, setNewItem] = useState<AddMerchandiseModel>({
    Price: 0,
    MerchandiseTitle: '',
    MerchandiseContent: '',
    RemainingQty: 0,
    CategoryId: '',
    CategoryDetailId: '',
    EnableSpec: false,
    MerchandisePhotos: new Blob(),
    SpecList: []
  });

  const [spec1List, setSpec1List] = useState<string[]>([]);
  const [spec2List, setSpec2List] = useState<string[]>([]);
  const categoryLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(categoryLabel.current!.offsetWidth);
  }, []);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.map((file: Blob) => {
        // setItemPhoto(file);
        setNewItem({ ...newItem, MerchandisePhotos: file });
        const reader = new FileReader();
        reader.onload = function(e: ProgressEvent<FileReader>) {
          if (e.target?.result) {
            setImages(prevState => [
              ...prevState,
              { id: cuid(), src: e.target?.result as string }
            ]);
          }
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    [newItem]
  );

  const addToMerchandise = () => {
    const Filedata = new FormData();
    Filedata.append('Price', newItem.Price.toString());
    Filedata.append('MerchandiseContent', newItem.MerchandiseContent);
    Filedata.append('MerchandiseTitle', newItem.MerchandiseTitle);
    Filedata.append('RemainingQty', newItem.RemainingQty.toString());
    Filedata.append('CategoryId', newItem.CategoryId);
    Filedata.append('CategoryDetailId', newItem.CategoryDetailId);
    Filedata.append('EnableSpec', newItem.EnableSpec.toString());
    if (newItem.EnableSpec) {
      newItem.SpecList.forEach((item, index) => {
        if (item.Enable) {
          Filedata.append(`SpecList[${index}].Price`, item.Price.toString());
          Filedata.append(`SpecList[${index}].Enable`, item.Enable.toString());
          Filedata.append(
            `SpecList[${index}].RemainingQty`,
            item.RemainingQty.toString()
          );
          Filedata.append(`SpecList[${index}].Spec1`, item.Spec1);
          Filedata.append(`SpecList[${index}].Spec2`, item.Spec2);
        }
      });
    }

    Filedata.append('MerchandisePhotos', newItem.MerchandisePhotos);

    Addmerchandise(Filedata).then(console.log);
  };

  useEffect(() => {
    const getCategoryList = async () => {
      const { data: response } = await GetCategoryList();

      if (response.Success) {
        console.log(response.Data);
        setCategoryList(response.Data);
      }
    };
    getCategoryList();
  }, []);

  useEffect(() => {
    const temp: AddSpecModel[] = [];
    spec1List.forEach(spec1data => {
      if (spec2List.length) {
        spec2List.forEach(spec2data => {
          temp.push({
            Price: 0,
            RemainingQty: 0,
            Spec1: spec1data,
            Spec2: spec2data,
            Enable: true
          });
        });
      } else {
        temp.push({
          Price: 0,
          RemainingQty: 0,
          Spec1: spec1data,
          Spec2: '',
          Enable: true
        });
      }
    });

    // setNewItem(state => (console.log(state), { ...state, SpecList: temp }));
    setNewItem(state => ({ ...state, SpecList: temp }));
  }, [spec1List, spec2List, setNewItem]);

  useEffect(() => {
    if (newItem.EnableSpec) {
      if (newItem.SpecList) {
        const temp = newItem.SpecList.map(data => data.RemainingQty).reduce(
          (prev, curr) => prev + curr,
          0
        );
        console.log(`SetSpecAmount:${temp}`);
        setNewItem(state => ({ ...state, RemainingQty: temp }));
      }
    }
  }, [setNewItem, newItem.EnableSpec, newItem.SpecList]);

  const deleteSpec1 = (spec: string) => {
    console.log('deleteSpec1');
    if (spec1List.length === 1 && spec2List.length > 0) {
      console.log('請先刪除spec2再繼續');
    } else {
      const index = spec1List.findIndex(value => value === spec);
      setSpec1List(state => {
        state.splice(index, 1);
        return [...state];
      });
    }
  };

  const deleteSpec2 = (spec: string) => {
    const index = spec2List.findIndex(value => value === spec);
    setSpec2List(state => {
      state.splice(index, 1);
      return [...state];
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.dragDropField}>
        <h1 style={{ textAlign: 'center' }}>Drag and Drop Region</h1>
        <Dropzone onDrop={onDrop} accept={'image/*'} />
        <ImageList images={images} />
      </Box>
      <form className={classes.formRoot} noValidate autoComplete="off">
        <TextField
          label="商品名稱"
          placeholder="商品名稱"
          variant="outlined"
          style={{ margin: '10px' }}
          value={newItem.MerchandiseTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, MerchandiseTitle: e.target.value })
          }
        />
        <TextField
          label="商品細節"
          placeholder="請在此輸入商品細節.."
          multiline
          rowsMax="4"
          variant="outlined"
          style={{ margin: '10px' }}
          value={newItem.MerchandiseContent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, MerchandiseContent: e.target.value })
          }
        />
        <TextField
          label="價錢"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          style={{ margin: '10px' }}
          value={newItem.Price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, Price: +e.target.value })
          }
          variant="outlined"
        />
        <TextField
          disabled={newItem.EnableSpec}
          label="希望上架數量"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={newItem.RemainingQty}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, RemainingQty: +e.target.value })
          }
          variant="outlined"
        />
        <FormControlLabel
          control={<Switch checked={newItem.EnableSpec} color="primary" />}
          onChange={(e: React.ChangeEvent<{}>, checked: boolean) =>
            setNewItem({ ...newItem, EnableSpec: checked })
          }
          label="擴充規格"
        />
        {newItem.EnableSpec && (
          <>
            <Box className={classes.specField}>
              <Box className={classes.specChip}>
                <TextField
                  label="規格一"
                  type="string"
                  InputLabelProps={{
                    shrink: true
                  }}
                  style={{ margin: '5px' }}
                  value={spec1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSpec1(e.target.value)
                  }
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      setSpec1List([...spec1List, spec1]);
                      setSpec1('');
                      // console.log(spec1List);
                    }
                  }}
                  variant="outlined"
                />
                {spec1List.map(spec => (
                  <Chip
                    key={spec}
                    label={spec}
                    style={{ margin: '3px' }}
                    variant="outlined"
                    color="primary"
                    onDelete={() => deleteSpec1(spec)}
                  />
                ))}
              </Box>
              <Box className={classes.specChip}>
                <TextField
                  label="規格二"
                  type="string"
                  style={{ margin: '5px' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  disabled={spec1List.length === 0}
                  value={spec2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSpec2(e.target.value)
                  }
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      setSpec2List([...spec2List, spec2]);
                      setSpec2('');
                    }
                  }}
                  variant="outlined"
                />
                {spec2List.map(spec => (
                  <Chip
                    key={spec}
                    label={spec}
                    style={{ margin: '3px' }}
                    variant="outlined"
                    color="primary"
                    onDelete={() => deleteSpec2(spec)}
                  />
                ))}
              </Box>
            </Box>
            {newItem.SpecList &&
              newItem.SpecList.map((spec, specIndex) => (
                <Box
                  key={spec.Spec1 + spec.Spec2}
                  className={classes.addNewSpec}
                >
                  <Box>{`規格:${spec.Spec1}+${spec.Spec2}`}</Box>
                  <TextField
                    label="上架數量"
                    placeholder="請輸入上架數量"
                    variant="outlined"
                    value={spec.RemainingQty}
                    style={{ margin: '10px' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewItem({
                        ...newItem,
                        SpecList: newItem.SpecList.map(
                          (item: AddSpecModel, index: number) => {
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
                      })
                    }
                  />
                  <TextField
                    label="規格價格"
                    placeholder="請輸入規格價格"
                    variant="outlined"
                    value={spec.Price}
                    style={{ margin: '10px' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewItem({
                        ...newItem,
                        SpecList: newItem.SpecList.map(
                          (item: AddSpecModel, index: number) => {
                            if (specIndex === index) {
                              return { ...item, Price: +e.target.value };
                            } else {
                              return item;
                            }
                          }
                        )
                      })
                    }
                  />
                  <FormControlLabel
                    control={<Switch checked={spec.Enable} color="primary" />}
                    onChange={(e: React.ChangeEvent<{}>, checked: boolean) =>
                      setNewItem({
                        ...newItem,
                        SpecList: newItem.SpecList.map(
                          (item: AddSpecModel, index: number) => {
                            if (specIndex === index) {
                              return { ...item, Enable: checked };
                            } else {
                              return item;
                            }
                          }
                        )
                      })
                    }
                    label="增加規格"
                  />
                </Box>
              ))}
          </>
        )}

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={categoryLabel}>商品分類</InputLabel>
          <Select
            value={newItem.CategoryId}
            onChange={e =>
              setNewItem({ ...newItem, CategoryId: e.target.value as string })
            }
            labelWidth={labelWidth}
          >
            {categoryList.map(category => (
              <MenuItem value={category.Cid} key={category.Cid}>
                {category.Cname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {newItem.CategoryId && (
            <>
              <InputLabel ref={categoryLabel}>細節分類</InputLabel>
              <Select
                value={newItem.CategoryDetailId}
                onChange={e =>
                  setNewItem({
                    ...newItem,
                    CategoryDetailId: e.target.value as string
                  })
                }
                labelWidth={labelWidth}
              >
                {categoryList[
                  categoryList.findIndex(
                    data => data.Cid === newItem.CategoryId
                  )
                ].Detail.map(detail => (
                  <MenuItem value={detail.DetailId} key={detail.DetailName}>
                    {detail.DetailName}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </FormControl>
      </form>

      <Button variant="contained" color="primary" onClick={addToMerchandise}>
        新增商品
      </Button>
    </Box>
  );
};

export default UploadMerchandisePage;
