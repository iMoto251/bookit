import h5py
import numpy as np
import spotlight
import torch
from spotlight.interactions import Interactions
from spotlight.cross_validation import random_train_test_split
from spotlight.evaluation import rmse_score
from spotlight.factorization.explicit import ExplicitFactorizationModel
from spotlight.datasets.goodbooks import get_goodbooks_dataset


def get_metadata(movie_id, metadata):
    movie_data = metadata[metadata['movieId'] == movie_id]
    return movie_data[['original_title', 'release_date', 'genres']].to_dict(orient='records')

def recommend_books(user_id, model, n_books=5):
    pred = model.predict(user_ids=user_id)
    indices = np.argpartition(pred, -n_books)[-n_books:]
    best_book_ids = indices[np.argsort(pred[indices])]
    
    return [get_metadata(book_id + 1, metadata) for book_id in best_book_ids]

# dataset is an Interactions class object
dataset = get_goodbooks_dataset()
print(dataset)
# should print: <Interactions dataset (944 users x 1683 items x 100000 interactions)>

model = ExplicitFactorizationModel(loss='regression',
                                   embedding_dim=128,  
                                   n_iter=10, 
                                   batch_size=1024, 
                                   l2=1e-9, 
                                   learning_rate=1e-3)


train, test = random_train_test_split(dataset, random=np.random.RandomState(42))
print('Split into \n {} and \n {}.'.format(train, test))

model.fit(train, verbose=True)

train_rmse = rmse_score(model, train)
test_rmse = rmse_score(model, test)
print('Train RMSE = ', train_rmse)
print('Test RMSE = ', test_rmse)





