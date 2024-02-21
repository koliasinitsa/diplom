-- Создание таблицы Пользователей с ролями и UUID
CREATE TABLE Users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255)  NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'deleted')),
    role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);



-- Создание таблицы Категорий
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Создание таблицы Коллекций
CREATE TABLE Collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(1000),
    user_id UUID REFERENCES Users(id),
    category_id UUID  REFERENCES categories(id),
    
    custom_string1_state BOOLEAN DEFAULT FALSE,
    custom_string1_name VARCHAR(255),
    custom_string2_state BOOLEAN DEFAULT FALSE,
    custom_string2_name VARCHAR(255),
    custom_string3_state BOOLEAN DEFAULT FALSE,
    custom_string3_name VARCHAR(255),
    
    custom_int1_state BOOLEAN DEFAULT FALSE,
    custom_int1_name VARCHAR(255),
    custom_int2_state BOOLEAN DEFAULT FALSE,
    custom_int2_name VARCHAR(255),
    custom_int3_state BOOLEAN DEFAULT FALSE,
    custom_int3_name VARCHAR(255),
    
    custom_text1_state BOOLEAN DEFAULT FALSE,
    custom_text1_name VARCHAR(255),
    custom_text2_state BOOLEAN DEFAULT FALSE,
    custom_text2_name VARCHAR(255),
    custom_text3_state BOOLEAN DEFAULT FALSE,
    custom_text3_name VARCHAR(255),
    
    custom_boolean1_state BOOLEAN DEFAULT FALSE,
    custom_boolean1_name VARCHAR(255),
    custom_boolean2_state BOOLEAN DEFAULT FALSE,
    custom_boolean2_name VARCHAR(255),
    custom_boolean3_state BOOLEAN DEFAULT FALSE,
    custom_boolean3_name VARCHAR(255),
    
    custom_date1_state BOOLEAN DEFAULT FALSE,
    custom_date1_name VARCHAR(255),
    custom_date2_state BOOLEAN DEFAULT FALSE,
    custom_date2_name VARCHAR(255),
    custom_date3_state BOOLEAN DEFAULT FALSE,
    custom_date3_name VARCHAR(255)
);



-- Создание таблицы Тэгов
CREATE TABLE tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE NOT NULL
);

-- Создание таблицы Айтемов
CREATE TABLE Items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tags_id UUID REFERENCES tags(id),
    collection_id UUID REFERENCES Collections(id),

    custom_string1_value VARCHAR(255),
    custom_string2_value VARCHAR(255),
    custom_string3_value VARCHAR(255),
    
    custom_int1_value INT,
    custom_int2_value INT,
    custom_int3_value INT,
    
    custom_text1_value TEXT,
    custom_text2_value TEXT,
    custom_text3_value TEXT,
    
    custom_boolean1_value BOOLEAN,
    custom_boolean2_value BOOLEAN,
    custom_boolean3_value BOOLEAN,
    
    custom_date1_value DATE,
    custom_date2_value DATE,
    custom_date3_value DATE
);

-- Создание таблицы Комментариев
CREATE TABLE Comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    user_id UUID REFERENCES Users(id),
    item_id UUID REFERENCES Items(id)
);

-- Создание таблицы Лайков
CREATE TABLE Likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES Users(id),
    item_id UUID REFERENCES Items(id)
);
