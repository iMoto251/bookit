import h5py
import numpy as np
import pandas as pd
import spotlight
import torch
from spotlight.interactions import Interactions
from spotlight.cross_validation import random_train_test_split
from spotlight.evaluation import rmse_score
from spotlight.factorization.explicit import ExplicitFactorizationModel
from spotlight.datasets.goodbooks import get_goodbooks_dataset

def get_book_info(work_id, books):
    book_info = book_data[book_data['bookId'] == work_id]
    return book_data[['title', 'author', 'genres']].to_dict(orient='records')

def recommend_books(user_id, model, n_books=5):
    pred = model.predict(user_ids=user_id)
    indices = np.argpartition(pred, -n_books)[-n_books:]
    best_book_ids = indices[np.argsort(pred[indices])]
    
    return [get_book_info(book_id + 1, metadata) for book_id in best_book_ids]

ratings_data = pd.read_csv('./csvData/ratings.csv')
book_data = pd.read_csv('./csvData/books.csv')


# dataset will be an instance of the Interactions class from spotlight.
# it takes the given data from the ratings table & extrapolates them into user-item interactions
dataset = Interactions(user_ids=ratings_data['user_id'].values,
                       item_ids=ratings_data['work_id'].values,
                       ratings=ratings_data['rating'].values)






model = ExplicitFactorizationModel(loss='regression',
                                   embedding_dim=128,  
                                   n_iter=10, 
                                   batch_size=1024, 
                                   l2=1e-9, 
                                   learning_rate=1e-3)


# randomly divides dataset into 2 randomly divided sections: one to train the model, and one
# to test how well the trained model performs
train, test = cross_validation.random_train_test_split(dataset, random=np.random.RandomState(42))
print('Split into \n {} and \n {}.'.format(train, test))

model.fit(train, verbose=True)

# compares trained factorization model to the data points observed in test.
# rmse score measures the absolute fit of model to data. lower value = better fit.
rmse = rmse_score(model, test)
print('Test RMSE = ', rmse)

# comparing the scores:
trained_rmse = rmse_score(model, train)
print('Trained RMSE = ', trained_rmse)


# to generate a prediction:
# model.predict(user_ids=1)

# (takes id or array of them, predicts ratings for each user based on it)


