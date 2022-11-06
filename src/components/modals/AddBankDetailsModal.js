import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import myAxios from '../../config/axios';
import { getCurrentUser } from '../../helpers/AuthManager';

export default function AddBankDetails({ prop }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const currentUser = getCurrentUser();
    const [BDObj, setBDObj] = useState([]);
    // console.log(currentUser);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register, watch, handleSubmit, formState: { errors }, control,
    } = useForm({
        mode: 'onBlur',
    });

    const submitAddBankDetails = async (data) => {
        console.log(data);
        try {
            await myAxios({
                method: 'post',
                url: '/bankDetails',
                data: {
                    ...data,
                    userId: currentUser.userId,
                    // eslint-disable-next-line no-unsafe-optional-chaining
                },
            }).then((res) => {
                console.log(res);
                alert(res.data);
                navigate('/events');
            });
        } catch (err) {
            alert(err.response.data);
        }
    };

    const getBankDetails = async () => {
        try {
            await myAxios({
                method: 'get',
                url: `/bankDetails/bankDetails/${currentUser.userId}`,
            }).then((res) => {
                // console.log(res.data);
                setBDObj(res.data);
                console.log(BDObj);
                // alert(res.data);
            });
        } catch (err) {
            alert(err.response.data);
        }
    };

    useEffect(() => {
        getBankDetails();
    // console.log(eventObj);
    }, []);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
        Bank Details
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle textAlign="center">Add BANK Details</DialogTitle>
                <Box
                    component="form"
                    onSubmit={handleSubmit(submitAddBankDetails)}
                    noValidate
                >
                    <DialogContent>
                        <DialogContentText textAlign="center">
              Add Bank Details
                        </DialogContentText>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        >
                            <TextField
                                defaultValue={BDObj[0] ? BDObj[0].accountNo : ''}
                                autoFocus
                                margin="normal"
                                id="standard-adornment-amount"
                                label="Account Number"
                                name="accountNo"
                                required
                                {...register('accountNo', {
                                    required: 'Account Number Required',
                                })}
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message}
                            />
                            <TextField
                                defaultValue={BDObj[0] ? BDObj[0].ifscCode : ''}
                                autoFocus
                                margin="normal"
                                id="standard-adornment-amount"
                                label="IFSC Code"
                                name="ifscCode"
                                required
                                {...register('ifscCode', {
                                    required: 'IFSC Code Required',
                                })}
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message}
                            />

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </div>
    );
}
