const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Topic = require('./models/Topic');

dotenv.config();

const topics = [
  {
    name: 'Algorithms',
    subtopics: [
      {
        name: 'Sorting Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/sort-an-array/',
        youtubeLink: 'https://www.youtube.com/watch?v=pkkFqlG0Hds',
        articleLink: 'https://www.geeksforgeeks.org/sorting-algorithms/',
        level: 'EASY'
      },
      {
        name: 'Searching Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/binary-search/',
        youtubeLink: 'https://www.youtube.com/watch?v=P3YID7liBug',
        articleLink: 'https://www.geeksforgeeks.org/searching-algorithms/',
        level: 'EASY'
      },
      {
        name: 'Dynamic Programming',
        leetcodeLink: 'https://leetcode.com/problems/climbing-stairs/',
        youtubeLink: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
        articleLink: 'https://www.geeksforgeeks.org/dynamic-programming/',
        level: 'MEDIUM'
      },
      {
        name: 'Greedy Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/assign-cookies/',
        youtubeLink: 'https://www.youtube.com/watch?v=ARvQcqJ_-NY',
        articleLink: 'https://www.geeksforgeeks.org/greedy-algorithms/',
        level: 'MEDIUM'
      },
      {
        name: 'Divide and Conquer',
        leetcodeLink: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        youtubeLink: 'https://www.youtube.com/watch?v=EeQ8pwjQxTM',
        articleLink: 'https://www.geeksforgeeks.org/divide-and-conquer/',
        level: 'MEDIUM'
      },
      {
        name: 'Backtracking',
        leetcodeLink: 'https://leetcode.com/problems/n-queens/',
        youtubeLink: 'https://www.youtube.com/watch?v=xFv_Hl4B83A',
        articleLink: 'https://www.geeksforgeeks.org/backtracking-algorithms/',
        level: 'HARD'
      }
    ]
  },
  {
    name: 'Data Structures',
    subtopics: [
      {
        name: 'Arrays',
        leetcodeLink: 'https://leetcode.com/problems/two-sum/',
        youtubeLink: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
        articleLink: 'https://www.geeksforgeeks.org/array-data-structure/',
        level: 'EASY'
      },
      {
        name: 'Linked Lists',
        leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
        youtubeLink: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
        articleLink: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
        level: 'EASY'
      },
      {
        name: 'Stacks',
        leetcodeLink: 'https://leetcode.com/problems/valid-parentheses/',
        youtubeLink: 'https://www.youtube.com/watch?v=wjI1WNcIntg',
        articleLink: 'https://www.geeksforgeeks.org/stack-data-structure/',
        level: 'EASY'
      },
      {
        name: 'Queues',
        leetcodeLink: 'https://leetcode.com/problems/implement-queue-using-stacks/',
        youtubeLink: 'https://www.youtube.com/watch?v=wjI1WNcIntg',
        articleLink: 'https://www.geeksforgeeks.org/queue-data-structure/',
        level: 'EASY'
      },
      {
        name: 'Trees',
        leetcodeLink: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
        youtubeLink: 'https://www.youtube.com/watch?v=fAAZixBzIAI',
        articleLink: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
        level: 'MEDIUM'
      },
      {
        name: 'Graphs',
        leetcodeLink: 'https://leetcode.com/problems/number-of-islands/',
        youtubeLink: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
        articleLink: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
        level: 'MEDIUM'
      },
      {
        name: 'Hash Tables',
        leetcodeLink: 'https://leetcode.com/problems/design-hashmap/',
        youtubeLink: 'https://www.youtube.com/watch?v=shs0KM3wKv8',
        articleLink: 'https://www.geeksforgeeks.org/hashing-data-structure/',
        level: 'MEDIUM'
      },
      {
        name: 'Heaps',
        leetcodeLink: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        youtubeLink: 'https://www.youtube.com/watch?v=t0Cq6tVNRBA',
        articleLink: 'https://www.geeksforgeeks.org/heap-data-structure/',
        level: 'HARD'
      }
    ]
  },
  {
    name: 'Databases',
    subtopics: [
      {
        name: 'SQL Basics',
        leetcodeLink: 'https://leetcode.com/problems/combine-two-tables/',
        youtubeLink: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        articleLink: 'https://www.w3schools.com/sql/',
        level: 'EASY'
      },
      {
        name: 'Joins',
        leetcodeLink: 'https://leetcode.com/problems/employees-earning-more-than-their-managers/',
        youtubeLink: 'https://www.youtube.com/watch?v=9yeOJ0ZMgt0',
        articleLink: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/',
        level: 'MEDIUM'
      },
      {
        name: 'Indexing',
        leetcodeLink: 'https://leetcode.com/problems/second-highest-salary/',
        youtubeLink: 'https://www.youtube.com/watch?v=-qNSXK7It44',
        articleLink: 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/',
        level: 'MEDIUM'
      },
      {
        name: 'Normalization',
        leetcodeLink: 'https://leetcode.com/problems/duplicate-emails/',
        youtubeLink: 'https://www.youtube.com/watch?v=UrYLYV7WSHM',
        articleLink: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/',
        level: 'MEDIUM'
      },
      {
        name: 'Transactions',
        leetcodeLink: 'https://leetcode.com/problems/delete-duplicate-emails/',
        youtubeLink: 'https://www.youtube.com/watch?v=P80Js_qClUE',
        articleLink: 'https://www.geeksforgeeks.org/transaction-in-dbms/',
        level: 'HARD'
      }
    ]
  },
  {
    name: 'Machine Learning',
    subtopics: [
      {
        name: 'Linear Regression',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=nk2CQITm_eo',
        articleLink: 'https://www.geeksforgeeks.org/ml-linear-regression/',
        level: 'EASY'
      },
      {
        name: 'Logistic Regression',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=yIYKR4sgzI8',
        articleLink: 'https://www.geeksforgeeks.org/understanding-logistic-regression/',
        level: 'EASY'
      },
      {
        name: 'Decision Trees',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=7VeUPuFGJHk',
        articleLink: 'https://www.geeksforgeeks.org/decision-tree/',
        level: 'MEDIUM'
      },
      {
        name: 'Neural Networks',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=aircAruvnKk',
        articleLink: 'https://www.geeksforgeeks.org/neural-networks-a-beginners-guide/',
        level: 'HARD'
      },
      {
        name: 'Clustering',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=4b5d3muPQmA',
        articleLink: 'https://www.geeksforgeeks.org/clustering-in-machine-learning/',
        level: 'MEDIUM'
      }
    ]
  },
  {
    name: 'Operating Systems',
    subtopics: [
      {
        name: 'Process Management',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=OrM7nZcxXZU',
        articleLink: 'https://www.geeksforgeeks.org/introduction-of-process-management/',
        level: 'EASY'
      },
      {
        name: 'Memory Management',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=qdkxXygc3rE',
        articleLink: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/',
        level: 'MEDIUM'
      },
      {
        name: 'File Systems',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=mzUyMy7Ihk0',
        articleLink: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/',
        level: 'MEDIUM'
      },
      {
        name: 'Deadlocks',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=UVo9mGARkhQ',
        articleLink: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/',
        level: 'HARD'
      },
      {
        name: 'CPU Scheduling',
        leetcodeLink: 'https://leetcode.com/problems/',
        youtubeLink: 'https://www.youtube.com/watch?v=Jkmy2YLUbUY',
        articleLink: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/',
        level: 'MEDIUM'
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing topics
    await Topic.deleteMany({});
    console.log('Existing topics cleared');

    // Insert new topics
    await Topic.insertMany(topics);
    console.log('Topics seeded successfully');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
