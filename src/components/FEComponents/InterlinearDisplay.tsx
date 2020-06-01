import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import PickDataSource from './PickDataSource';
import { CardContent, Typography, InputBase } from '@material-ui/core';
import { Translate, withLocalize } from 'react-localize-redux';

function InterlinearColumn() {
    return (
        <Container maxWidth='sm'>
            <PickDataSource />
            <Card variant='outlined'>
                <CardContent>
                    <Typography>
                        <Translate id="interlinearDisplay.input" />
                    </Typography>
                    <InputBase
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ 'aria-label': 'naked' }}
                    />
                </CardContent>
            </Card>

            <Card variant='outlined'>
                <CardContent>
                    <Typography>
                        <Translate id="interlinearDisplay.output" />
                    </Typography>
                    <div className='OutputField'/>
                </CardContent>
            </Card>
            <Button> <Translate id="interlinearDisplay.copy"/> </Button>
        </Container>
    )
}

export default withLocalize(InterlinearColumn);