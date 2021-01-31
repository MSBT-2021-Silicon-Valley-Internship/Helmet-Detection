from configparser import ConfigParser
from sqlalchemy import create_engine, exc
import os

def read_config():
    '''
        Instantiating a config file reader for our use case.
        To be used to read credentials for connecting to PSQL
        DB hosted in GCP SQL.
    :return: ConfigParser
    '''

    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, './config.ini')

    config = ConfigParser()
    config.read(file_path)

    return config

def connection_uri():
    '''
        Creating connection URI for connecting to PSQL DB. URI will
        be used to create SQLAlchemy engine for executing queries.
        :return: URI for our PSQL DB hosted in GCP SQL
    '''
    config = read_config()

    URI = 'postgresql+psycopg2://{}:{}@/{}?host={}'.format(
        config['users_images_database']['user'],
        config['users_images_database']['password'],
        config['users_images_database']['dbname'],
        config['users_images_database']['host']
    )

    return URI

def create_helmet_table():
    '''
        Function used to create an SQL table for inserting our
        helmet into. We are using SQLAlchemy's DB engine
        for executing our created query.
    :return:
    '''

    URI = connection_uri()
    my_connection = None
    TABLE_NAME = "helmet"

    CREATE_TABLE_QUERY = """
                    CREATE TABLE IF NOT EXISTS {} (
                        image_id INT NOT NULL,
                        image_name VARCHAR(100) NOT NULL,
                        image_date TIMESTAMPTZ NOT NULL,
                        image_result BOOLEAN NOT NULL,
                        PRIMARY KEY(image_id)
                    )""".format(TABLE_NAME)
    
    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        my_connection.execute(CREATE_TABLE_QUERY)

        return "Table created successfully"

    except exc.SQLAlchemyError as error:
        return 'Error trying to create table: {}'.format(error)

    finally:
        my_connection.close()
        engine.dispose()

def insert_helmet(image_id, image_name, image_date, image_result):
    '''
    Function used to insert our calculation into the DB.
    :param firstNum: first operand of calculation
    :param secondNum: second operand of calculation
    :param answer: calculation answer
    :return: error or success strings for inserting into DB.
    '''
    URI = connection_uri()
    my_connection = None

    try:
        engine = create_engine(URI, echo=True)
        my_connection = engine.connect()
        create_helmet_table()
        my_connection.execute('INSERT INTO helmet (image_id, image_name, image_date, image_result)'
                'VALUES (?, ?, ?, ?)', (image_id, image_name, image_date, image_result))
        return "Insertion successful"

    except exc.SQLAlchemyError as err:
        return 'Error occured inserting into table {}. Exception: {}'.format("helmet", err)

    finally:
        my_connection.close()
        engine.dispose()

def connection():
    URI = connection_uri()
    my_connection = None

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        create_helmet_table()
        return "connection successful"
    except exc.SQLAlchemyError as err:
        return 'connection Error {}. Exception: {}'.format("helmet", err)

    finally:
        my_connection.close()
        engine.dispose()

def get_helmet(id):
    '''
    Function used to fetch helmet result from PSQL DB.
    :return: hashmap with DB helmet values
    '''

    URI = connection_uri()
    my_connection = None
    #helmet에 있는 데이터 가져오기
    GET_HELMET_QUERY = """
                                SELECT count(image_result) FROM helmet LIMIT 1
                             """

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()

        helmet = my_connection.execute(GET_HELMET_QUERY)

        helmet_history = {}

        i = 1
        for row in helmet:
            helmet_history[i] = (row['image_id'], row['image_result']) #id, result만 가져와서 리스트에 넣기
            i += 1

        return helmet_history[id]

    except exc.SQLAlchemyError as err:
        return 'Error fetching from table {}. Exception: {}'.format("helmet", err)

    finally:
        my_connection.close()
        engine.dispose()

def delete_helmet():
    '''
    Function used to delete helmet from helmet DB, based on operands.
    :return: string message on whether deleted successfully or not
    '''

    URI = connection_uri()
    my_connection = None

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        my_connection.execute('DELETE from helmet') #모든 데이터 삭제
        return "Deletion successful"
    except exc.SQLAlchemyError as err:
        return 'Error deleting data from table {}. Exception: {}'.format("helmet", err)

    finally:
        my_connection.close()
        engine.dispose()


if __name__=="__main__":
    connection()