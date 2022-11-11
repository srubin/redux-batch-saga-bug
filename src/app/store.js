import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer, {counterSlice} from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  enhancers: [reduxBatch, applyMiddleware(sagaMiddleware), reduxBatch],
});

sagaMiddleware.run(function* () {
  yield takeEvery(counterSlice.actions.increment.type, function* () {
    console.log('got increment, now dispatching a batch of 2 decrements');
    yield put([counterSlice.actions.decrement(), counterSlice.actions.decrement()]);
  })

  yield takeEvery(counterSlice.actions.decrement.type, function* () {
    // BUG: this doesn't get called when the batch is dispatched from the saga above
    console.log('got decrement');
  });
});
