// samples

create TABLE person(
    id INT NOT NULL,
        PRIMARY KEY(id),
    name VARCHAR(255),
    surname VARCHAR(255)
);

create TABLE post(
    id INT,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INT,
    INDEX user_ind (user_id),
    FOREIGN KEY (user_id) 
        REFERENCES person(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);